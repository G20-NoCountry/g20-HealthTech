"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("../config/database.config");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rol: {
        type: sequelize_1.DataTypes.ENUM("medico", "paciente"),
        allowNull: false,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.CHAR(60),
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = User;
