"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig = {
    development: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "healthtech_db",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        dialect: "mysql",
        logging: process.env.DB_LOGGING === "true" ? console.log : false,
    },
    test: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME + "_test" || "healthtech_db_test",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        dialect: "mysql",
        logging: false,
    },
    production: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "healthtech_db",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        dialect: "mysql",
        logging: false,
    },
};
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
exports.sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        timestamps: true,
        underscored: false,
        freezeTableName: true,
    },
});
exports.default = exports.sequelize;
