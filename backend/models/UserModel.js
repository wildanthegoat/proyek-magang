import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    uuid: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING(50), 
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    username: {
        type: DataTypes.STRING(50), 
        allowNull: false,
        unique: true, 
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING(100), 
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.ENUM('super admin', 'admin', 'user'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    divisi: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }

}, {
    freezeTableName: true
});

export default Users;
