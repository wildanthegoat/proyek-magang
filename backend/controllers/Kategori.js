import Kategori from "../models/KategoriModel.js";

export const getKategori = async (req, res) => {
    try {
        const kategori = await Kategori.findAll();
        res.status(200).json(kategori);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getKategoriById = async (req, res) => {
    try {
        const kategori = await Kategori.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!kategori) return res.status(404).json({ msg: "Kategori tidak ditemukan" });
        res.status(200).json(kategori);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Membuat kategori baru
export const createKategori = async (req, res) => {
    const { nama_kategori } = req.body;
    try {
        await Kategori.create({
            nama_kategori: nama_kategori
        });
        res.status(201).json({msg: "Kategori telah ditambahkan"});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Memperbarui kategori
export const updateKategori = async (req, res) => {
    const { nama_kategori } = req.body;
    try {
        const kategori = await Kategori.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!kategori) return res.status(404).json({ msg: "Kategori tidak ditemukan" });

        kategori.nama_kategori = nama_kategori;
        await kategori.save();

        res.status(200).json({ msg: "Kategori berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Menghapus kategori
export const deleteKategori = async (req, res) => {
    try {
        const kategori = await Kategori.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!kategori) return res.status(404).json({ msg: "Kategori tidak ditemukan" });

        await kategori.destroy();
        res.status(200).json({ msg: "Kategori berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
