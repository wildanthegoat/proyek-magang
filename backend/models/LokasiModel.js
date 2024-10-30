import { Sequelize, UUID } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Lokasi = db.define('lokasi', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kampus: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: true,
            len:[3, 30]
        }
    },
    gedung: {
        type: DataTypes.STRING (50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len:[3, 50]
        }
    },
    ruangan: {
        type: DataTypes.STRING (50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len:[3, 50]
        }
    },

}, {
    freezeTableName: true
});

export default Lokasi;