import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";
import Kategori from "./KategoriModel.js";
import Lokasi from "./LokasiModel.js";

const { DataTypes } = Sequelize;

const Barang = db.define('barang', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nama_barang: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            notEmpty: true
        }
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tanggal_masuk: {
        type: DataTypes.DATE,
        allowNull: true
    },
    tanggal_keluar: {
        type: DataTypes.DATE,
        allowNull: true
    },
    kondisi: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    kategoriId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Kategori,
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

// Asosiasi
Users.hasMany(Barang, { foreignKey: 'userId' });
Barang.belongsTo(Users, { foreignKey: 'userId' });

Kategori.hasMany(Barang, { foreignKey: 'kategoriId' });
Barang.belongsTo(Kategori, { foreignKey: 'kategoriId' });

Lokasi.hasMany(Barang, { foreignKey: 'lokasiId' });
Barang.belongsTo(Lokasi, { foreignKey: 'lokasiId' });

export default Barang;