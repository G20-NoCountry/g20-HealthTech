"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabaseConnection = exports.initializeDatabase = void 0;
const database_config_1 = require("../config/database.config");
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Test the connection
        yield database_config_1.sequelize.authenticate();
        console.log("✅ Database connection established successfully.");
        // Sync models with database
        yield database_config_1.sequelize.sync({ force: false, alter: true });
        console.log("✅ Database synchronized successfully.");
        return true;
    }
    catch (error) {
        console.error("❌ Unable to connect to the database:", error);
        return false;
    }
});
exports.initializeDatabase = initializeDatabase;
const closeDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_config_1.sequelize.close();
        console.log("✅ Database connection closed.");
    }
    catch (error) {
        console.error("❌ Error closing database connection:", error);
    }
});
exports.closeDatabaseConnection = closeDatabaseConnection;
