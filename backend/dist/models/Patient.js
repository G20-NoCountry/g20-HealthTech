"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("../config/database.config");
class Patient extends sequelize_1.Model {
}
Patient.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: "users",
            key: "id",
        },
    },
    id_health_insurance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "health_insurance",
            key: "id",
        },
    },
    blood_type: {
        type: sequelize_1.DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
        allowNull: false,
    },
    alergias: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    cronicas_condition: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    actual_medication: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_config_1.sequelize,
    tableName: "patients",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = Patient;
