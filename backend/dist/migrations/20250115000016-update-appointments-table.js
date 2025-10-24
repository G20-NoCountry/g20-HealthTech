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
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const up = (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryInterface.changeColumn("appointments", "doctor_id", {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        field: "medic_id",
    });
    yield queryInterface.addColumn("appointments", "end_at", {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    });
    yield queryInterface.changeColumn("appointments", "symptoms", {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    });
    yield queryInterface.changeColumn("appointments", "diagnostic", {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    });
});
exports.up = up;
const down = (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryInterface.changeColumn("appointments", "medic_id", {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        field: "doctor_id",
    });
    yield queryInterface.removeColumn("appointments", "end_at");
    yield queryInterface.changeColumn("appointments", "symptoms", {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    });
    yield queryInterface.changeColumn("appointments", "diagnostic", {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    });
});
exports.down = down;
