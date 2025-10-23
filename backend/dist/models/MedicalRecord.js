"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("../config/database.config");
class MedicalRecord extends sequelize_1.Model {
}
MedicalRecord.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    doctor_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    record_type: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT("long"),
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
    tableName: "medical_records",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = MedicalRecord;
