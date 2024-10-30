import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes:['uuid','name','username','role','divisi']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes:['uuid','name','username','role','divisi'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { name, username, password, confPassword, role, divisi } = req.body;
    if(!password || password.trim() === "") {
        return res.status(404).json({ msg: "Password tidak boleh kosong"});
        }
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password tidak cocok" });
    }
    try {
        const hashPassword = await argon2.hash(password);
        await Users.create({
            name: name,
            username: username,
            password: hashPassword,
            role: role,
            divisi: divisi
        });
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { name, username, password, confPassword, role, divisi } = req.body;

    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    let hashPassword;
    if (password) {
        if (password !== confPassword) return res.status(400).json({ msg: "Password tidak cocok" });
        hashPassword = await argon2.hash(password);
    } else {
        hashPassword = user.password;
    }

    try {
        await Users.update({
            name: name,
            username: username,
            password: hashPassword,
            role: role,
            divisi: divisi
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Data user berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        await Users.destroy({
            where: {
                uuid: req.params.id
            }
        });

        res.status(200).json({ msg: "User berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
