"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.Teleconsultation = exports.MedicalRecord = exports.Appointment = exports.Medic = exports.Patient = exports.HealthInsurance = exports.User = exports.Role = exports.sequelize = void 0;
const database_config_1 = require("../config/database.config");
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return database_config_1.sequelize; } });
const Role_1 = __importDefault(require("./Role"));
exports.Role = Role_1.default;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const HealthInsurance_1 = __importDefault(require("./HealthInsurance"));
exports.HealthInsurance = HealthInsurance_1.default;
const Patient_1 = __importDefault(require("./Patient"));
exports.Patient = Patient_1.default;
const Medic_1 = __importDefault(require("./Medic"));
exports.Medic = Medic_1.default;
const Appointment_1 = __importDefault(require("./Appointment"));
exports.Appointment = Appointment_1.default;
const MedicalRecord_1 = __importDefault(require("./MedicalRecord"));
exports.MedicalRecord = MedicalRecord_1.default;
const Teleconsultation_1 = __importDefault(require("./Teleconsultation"));
exports.Teleconsultation = Teleconsultation_1.default;
const Notification_1 = __importDefault(require("./Notification"));
exports.Notification = Notification_1.default;
// Define associations
const setupAssociations = () => {
    // Role associations
    Role_1.default.hasMany(User_1.default, { foreignKey: "role_id", as: "users" });
    User_1.default.belongsTo(Role_1.default, { foreignKey: "role_id", as: "role" });
    // HealthInsurance associations
    HealthInsurance_1.default.hasMany(Patient_1.default, {
        foreignKey: "id_health_insurance",
        as: "patients",
    });
    Patient_1.default.belongsTo(HealthInsurance_1.default, {
        foreignKey: "id_health_insurance",
        as: "healthInsurance",
    });
    // User associations with Patient and Medic (inheritance-like relationship)
    User_1.default.hasOne(Patient_1.default, { foreignKey: "id", as: "patient" });
    Patient_1.default.belongsTo(User_1.default, { foreignKey: "id", as: "user" });
    User_1.default.hasOne(Medic_1.default, { foreignKey: "id", as: "medic" });
    Medic_1.default.belongsTo(User_1.default, { foreignKey: "id", as: "user" });
    // Appointment associations
    User_1.default.hasMany(Appointment_1.default, {
        foreignKey: "patient_id",
        as: "patientAppointments",
    });
    User_1.default.hasMany(Appointment_1.default, {
        foreignKey: "doctor_id",
        as: "doctorAppointments",
    });
    Appointment_1.default.belongsTo(User_1.default, { foreignKey: "patient_id", as: "patient" });
    Appointment_1.default.belongsTo(User_1.default, { foreignKey: "doctor_id", as: "doctor" });
    // MedicalRecord associations
    User_1.default.hasMany(MedicalRecord_1.default, {
        foreignKey: "patient_id",
        as: "patientRecords",
    });
    User_1.default.hasMany(MedicalRecord_1.default, { foreignKey: "doctor_id", as: "doctorRecords" });
    MedicalRecord_1.default.belongsTo(User_1.default, { foreignKey: "patient_id", as: "patient" });
    MedicalRecord_1.default.belongsTo(User_1.default, { foreignKey: "doctor_id", as: "doctor" });
    // Teleconsultation associations
    Appointment_1.default.hasOne(Teleconsultation_1.default, {
        foreignKey: "appointment_id",
        as: "teleconsultation",
    });
    Teleconsultation_1.default.belongsTo(Appointment_1.default, {
        foreignKey: "appointment_id",
        as: "appointment",
    });
    // Notification associations
    User_1.default.hasMany(Notification_1.default, { foreignKey: "user_id", as: "notifications" });
    Notification_1.default.belongsTo(User_1.default, { foreignKey: "user_id", as: "user" });
    Appointment_1.default.hasMany(Notification_1.default, {
        foreignKey: "appointment_id",
        as: "notifications",
    });
    Notification_1.default.belongsTo(Appointment_1.default, {
        foreignKey: "appointment_id",
        as: "appointment",
    });
};
// Setup associations
setupAssociations();
exports.default = {
    sequelize: database_config_1.sequelize,
    Role: Role_1.default,
    User: User_1.default,
    HealthInsurance: HealthInsurance_1.default,
    Patient: Patient_1.default,
    Medic: Medic_1.default,
    Appointment: Appointment_1.default,
    MedicalRecord: MedicalRecord_1.default,
    Teleconsultation: Teleconsultation_1.default,
    Notification: Notification_1.default,
};
