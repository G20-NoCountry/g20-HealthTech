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
    // Check if end_at column already exists
    const tableDescription = yield queryInterface.describeTable("appointments");
    if (!tableDescription.end_at) {
        yield queryInterface.addColumn("appointments", "end_at", {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        });
    }
});
exports.up = up;
const down = (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryInterface.removeColumn("appointments", "end_at");
});
exports.down = down;
