import { Sequelize, UUID } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Kategori = db.define('kategori', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nama_kategori: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len:[3, 50]
        }
    }
}, {
    freezeTableName: true
});

export default Kategori;