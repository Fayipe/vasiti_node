import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../config";
export const DB = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    logging: false,
    typeValidation: true,
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        createdAt: "date_uploaded",
        updatedAt: "date_edited",
        deletedAt: "date_deleted",
        paranoid: true,
        underscored: true
    },
    pool: {
        max: 20,
        min: 0,
        acquire: 60000,
        idle: 10000,
        evict: 60000
    }
});
