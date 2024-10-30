import express from "express";
import {
    getLokasi,
    getLokasiById,
    createLokasi,
    updateLokasi,
    deleteLokasi
} from "../controllers/Lokasi.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/lokasi', verifyUser, getLokasi);
router.get('/lokasi/:id', verifyUser, getLokasiById);
router.post('/lokasi', verifyUser, adminOnly, createLokasi);
router.patch('/lokasi/:id', verifyUser, adminOnly, updateLokasi);
router.delete('/lokasi/:id', verifyUser, adminOnly, deleteLokasi);

export default router;
