import Barang from "../models/BarangModel.js";
import Kategori from "../models/KategoriModel.js";
import Lokasi from "../models/LokasiModel.js";
import Users from "../models/UserModel.js";

export const getBarang = async (req, res) =>{
    try {
        const response = await Barang.findAll({
            include: [
                {
                    model: Kategori,
                    attributes: ['nama_kategori']
                },
                {
                    model: Lokasi,
                    attributes: ['kampus', 'gedung', 'ruangan']
                },
                {
                    model: Users,
                    attributes: ['username']
                }
            ],
            attributes: { exclude: ['id','createdAt', 'updatedAt','userId','kategoriId','lokasiId'] }
        });        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getBarangById = async (req, res) => {
    try {
        const barang = await Barang.findOne({
            where: {
                uuid: req.params.id
            },
            include: [
                {
                    model: Kategori,
                    attributes: ['nama_kategori']
                },
                {
                    model: Lokasi,
                    attributes: ['kampus', 'gedung', 'ruangan']
                },
                {
                    model: Users,
                    attributes: ['username']
                }
            ],
            attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'userId', 'kategoriId', 'lokasiId'] }
        });
        if (!barang) return res.status(404).json({ msg: "Data tidak ditemukan" });
        res.status(200).json(barang);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const createBarang = async (req, res) => {
    const { nama_barang, jumlah, deskripsi, tanggal_masuk, tanggal_keluar, kondisi, lokasiKampusUUID, kategoriNama } = req.body;

    try {
        console.log("Received data:", req.body);
        
        // Find lokasi by UUID
        const lokasi = await Lokasi.findOne({
            where: {
                uuid: lokasiKampusUUID
            }
        });
        if (!lokasi) {
            return res.status(404).json({ msg: "Lokasi dengan UUID tersebut tidak ditemukan" });
        }

        // Find kategori by name
        const kategori = await Kategori.findOne({
            where: {
                nama_kategori: kategoriNama
            }
        });
        if (!kategori) {
            return res.status(404).json({ msg: "Kategori dengan nama_kategori tersebut tidak ditemukan" });
        }

        // Get user ID
        const userId = req.userId;
        if (!userId) return res.status(401).json({ msg: "User ID tidak ditemukan" });

        // Create new barang
        const newBarang = await Barang.create({
            nama_barang,
            jumlah,
            deskripsi,
            tanggal_masuk,
            tanggal_keluar,
            kondisi,
            lokasiId: lokasi.id,
            kategoriId: kategori.id,
            userId
        });

        res.status(201).json(newBarang);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const updateBarang = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nama_barang,
        jumlah,
        deskripsi,
        tanggal_masuk,
        tanggal_keluar,
        kondisi,
        lokasiKampusUUID,
        kategoriNama
      } = req.body;
  
      const barang = await Barang.findOne({ where: { uuid: id } });
      if (!barang) {
        return res.status(404).json({ msg: "Barang not found" });
      }
  
      // Update the Barang entry
      barang.nama_barang = nama_barang;
      barang.jumlah = jumlah;
      barang.deskripsi = deskripsi;
      barang.tanggal_masuk = tanggal_masuk;
      barang.tanggal_keluar = tanggal_keluar;
      barang.kondisi = kondisi;
  
      // Find and set the associated Lokasi
      if (lokasiKampusUUID) {
        const lokasi = await Lokasi.findOne({ where: { uuid: lokasiKampusUUID } });
        if (!lokasi) {
          return res.status(404).json({ msg: "Lokasi not found" });
        }
        barang.lokasiKampusUUID = lokasi.uuid;
      }
  
      // Find and set the associated Kategori
      if (kategoriNama) {
        const kategori = await Kategori.findOne({ where: { nama_kategori: kategoriNama } });
        if (!kategori) {
          return res.status(404).json({ msg: "Kategori tidak ditemukan" });
        }
        barang.kategoriNama = kategori.nama_kategori;
      }
  
      await barang.save();
  
      res.status(200).json({ msg: "Barang berhasil diperbarui" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

export const deleteBarang = async (req, res) =>{
    try {
        const barang = await Barang.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!barang) return res.status(404).json({ msg: "Barang tidak ditemukan" });

        await barang.destroy();
        res.status(200).json({ msg: "Barang berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    } 
}