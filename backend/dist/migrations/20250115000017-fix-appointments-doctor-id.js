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
const up = (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Try to drop the existing foreign key constraint if it exists
        yield queryInterface.removeConstraint("appointments", "appointments_ibfk_2");
    }
    catch (error) {
        // Constraint might not exist, continue
        console.log("Constraint appointments_ibfk_2 not found, continuing...");
    }
    // Check if doctor_id column exists and rename it to medic_id
    const tableDescription = yield queryInterface.describeTable("appointments");
    if (tableDescription.doctor_id) {
        yield queryInterface.renameColumn("appointments", "doctor_id", "medic_id");
    }
    // Add the foreign key constraint back with the new column name
    yield queryInterface.addConstraint("appointments", {
        fields: ["medic_id"],
        type: "foreign key",
        name: "appointments_medic_id_fk",
        references: {
            table: "users",
            field: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    });
});
exports.up = up;
const down = (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
    // Drop the foreign key constraint
    yield queryInterface.removeConstraint("appointments", "appointments_medic_id_fk");
    // Rename the column back from medic_id to doctor_id
    yield queryInterface.renameColumn("appointments", "medic_id", "doctor_id");
    // Add the foreign key constraint back with the original column name
    yield queryInterface.addConstraint("appointments", {
        fields: ["doctor_id"],
        type: "foreign key",
        name: "appointments_ibfk_2",
        references: {
            table: "users",
            field: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    });
});
exports.down = down;
