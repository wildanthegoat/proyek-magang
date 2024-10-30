import Lokasi from "../models/LokasiModel.js";

export const getLokasi = async (req, res) => {
    try {
        const lokasi = await Lokasi.findAll();
        res.status(200).json(lokasi);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getLokasiById = async (req, res) => {
    try {
        const lokasi = await Lokasi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!lokasi) return res.status(404).json({ msg: "Lokasi tidak ditemukan" });
        res.status(200).json(lokasi);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createLokasi = async (req, res) => {
    const { kampus, gedung, ruangan } = req.body;
    try {
        await Lokasi.create({
            kampus,
            gedung,
            ruangan
        });
        res.status(201).json({msg:"Lokasi telah ditambahkan"});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateLokasi = async (req, res) => {
    const { kampus, gedung, ruangan } = req.body;
    try {
        const lokasi = await Lokasi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!lokasi) return res.status(404).json({ msg: "Lokasi tidak ditemukan" });

        lokasi.kampus = kampus;
        lokasi.gedung = gedung;
        lokasi.ruangan = ruangan;
        await lokasi.save();

        res.status(200).json({ msg: "Lokasi berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteLokasi = async (req, res) => {
    try {
        const lokasi = await Lokasi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!lokasi) return res.status(404).json({ msg: "Lokasi tidak ditemukan" });

        await lokasi.destroy();
        res.status(200).json({ msg: "Lokasi berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
