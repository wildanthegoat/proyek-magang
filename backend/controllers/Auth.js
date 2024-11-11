import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        const match = await argon2.verify(user.password, req.body.password);
        if (!match) return res.status(400).json({ msg: "Wrong password" });

        req.session.userId = user.uuid; // Simpan user.uuid di sesi
        res.status(200).json({
            uuid: user.uuid,
            name: user.name,
            username: user.username,
            role: user.role,
            divisi: user.divisi
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const Me = async (req, res) =>{
    if (!req.session.userId) {
        return res.status(401).json({msg:"Mohon Login ke akun Anda!"})        
    }
    const user = await Users.findOne({
        attributes: ['uuid', 'name', 'username', 'role', 'divisi'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({ msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat LogOut"});
        res.status(200).json({msg: "Anda telah LogOut"});
    });
}