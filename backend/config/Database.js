import {Sequelize} from "sequelize";

const db = new Sequelize('dashboard', 'root', 'edgar123', {
    host: "localhost",
    dialect: "mysql"
});

export default db