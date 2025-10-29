import { sequelize } from "../config/database.config";
import User from "./User";
import Patient from "./Patient";
import Medic from "./Medic";
import Appointment from "./Appointment";
import MedicalRecord from "./MedicalRecord";
import Teleconsultation from "./Teleconsultation";
import Notification from "./Notification";

// Define associations
export const setupAssociations = () => {
  // User associations with Patient and Medic (inheritance-like relationship)
  User.hasOne(Patient, { foreignKey: "id", as: "patient" });
  Patient.belongsTo(User, { foreignKey: "id", as: "user" });

  User.hasOne(Medic, { foreignKey: "id", as: "medic" });
  Medic.belongsTo(User, { foreignKey: "id", as: "user" });

  // Appointment associations
  User.hasMany(Appointment, {
    foreignKey: "patient_id",
    as: "patientAppointments",
  });
  User.hasMany(Appointment, {
    foreignKey: "medic_id",
    as: "medicAppointments",
  });

  Appointment.belongsTo(User, { foreignKey: "patient_id", as: "patient" });
  Appointment.belongsTo(User, { foreignKey: "medic_id", as: "medic" });

  // MedicalRecord associations
  User.hasMany(MedicalRecord, {
    foreignKey: "patient_id",
    as: "patientRecords",
  });
  User.hasMany(MedicalRecord, { foreignKey: "medic_id", as: "medicRecords" });

  MedicalRecord.belongsTo(User, { foreignKey: "patient_id", as: "patient" });
  MedicalRecord.belongsTo(User, { foreignKey: "medic_id", as: "medic" });

  // Teleconsultation associations
  Appointment.hasOne(Teleconsultation, {
    foreignKey: "appointment_id",
    as: "teleconsultation",
  });
  Teleconsultation.belongsTo(Appointment, {
    foreignKey: "appointment_id",
    as: "appointment",
  });

  // Notification associations
  User.hasMany(Notification, { foreignKey: "user_id", as: "notifications" });
  Notification.belongsTo(User, { foreignKey: "user_id", as: "user" });

  Appointment.hasMany(Notification, {
    foreignKey: "appointment_id",
    as: "notifications",
  });
  Notification.belongsTo(Appointment, {
    foreignKey: "appointment_id",
    as: "appointment",
  });
};

// Setup associations

// Export models and sequelize instance
export {
  sequelize,
  User,
  Patient,
  Medic,
  Appointment,
  MedicalRecord,
  Teleconsultation,
  Notification,
};

export default {
  sequelize,
  User,
  Patient,
  Medic,
  Appointment,
  MedicalRecord,
  Teleconsultation,
  Notification,
};
