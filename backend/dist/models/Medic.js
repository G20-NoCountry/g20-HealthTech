"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("../config/database.config");
class Medic extends sequelize_1.Model {
}
Medic.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: "users",
            key: "id",
        },
    },
    specialty: {
        type: sequelize_1.DataTypes.ENUM("oftamologia", "etc"),
        allowNull: false,
    },
    licence_num: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    schedule_from: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    schedule_at: {
        type: sequelize_1.DataTypes.DATE,
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
    tableName: "medic",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = Medic;
