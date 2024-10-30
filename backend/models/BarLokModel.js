import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Barang from "./BarangModel.js";
import Lokasi from "./LokasiModel.js";

const { DataTypes } = Sequelize;

const BarangLokasi = db.define('barang_lokasi', {
    barangId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Barang,
            key: 'id'
        }
    },
    lokasiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Lokasi,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

export default BarangLokasi;
