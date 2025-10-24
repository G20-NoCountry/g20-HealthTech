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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const Appointment_1 = __importDefault(require("../models/Appointment"));
const sequelize_1 = require("sequelize");
class AppointmentService {
    createAppointment(appointmentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate required fields
                if (!appointmentData.medic_id || !appointmentData.patient_id) {
                    throw new Error("medic_id y patient_id son requeridos");
                }
                // Check for overlapping appointments
                const overlappingAppointment = yield this.checkForOverlappingAppointments(appointmentData.medic_id, appointmentData.start_at, appointmentData.end_at);
                if (overlappingAppointment) {
                    throw new Error("Ya existe una cita en ese horario para este médico");
                }
                const appointment = yield Appointment_1.default.create(appointmentData);
                return appointment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAppointmentsByMedic(medicId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const whereClause = {
                    medic_id: medicId,
                };
                if (startDate && endDate) {
                    whereClause.start_at = {
                        [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)],
                    };
                }
                const appointments = yield Appointment_1.default.findAll({
                    where: whereClause,
                    order: [["start_at", "ASC"]],
                });
                return appointments;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAppointmentsByPatient(patientId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const whereClause = {
                    patient_id: patientId,
                };
                if (startDate && endDate) {
                    whereClause.start_at = {
                        [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)],
                    };
                }
                const appointments = yield Appointment_1.default.findAll({
                    where: whereClause,
                    order: [["start_at", "ASC"]],
                });
                return appointments;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAppointmentById(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield Appointment_1.default.findByPk(appointmentId);
                return appointment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateAppointment(appointmentId, updateData, userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield Appointment_1.default.findByPk(appointmentId);
                if (!appointment) {
                    throw new Error("Cita no encontrada");
                }
                // If updating time, check for overlapping appointments
                if (updateData.start_at || updateData.end_at) {
                    const startTime = updateData.start_at || appointment.start_at.toISOString();
                    const endTime = updateData.end_at || appointment.end_at.toISOString();
                    const overlappingAppointment = yield this.checkForOverlappingAppointments(appointment.doctor_id, startTime, endTime, appointmentId);
                    if (overlappingAppointment) {
                        throw new Error("Ya existe una cita en ese horario para este médico");
                    }
                }
                // Restrict certain fields based on user role
                if (userRole === "patient") {
                    // Patients can only update time, type, and symptoms
                    const allowedFields = ["start_at", "end_at", "type", "symptoms"];
                    const filteredData = {};
                    Object.keys(updateData).forEach((key) => {
                        if (allowedFields.includes(key)) {
                            filteredData[key] = updateData[key];
                        }
                    });
                    yield appointment.update(filteredData);
                }
                else {
                    // Medics can update all fields
                    yield appointment.update(updateData);
                }
                return appointment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteAppointment(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield Appointment_1.default.findByPk(appointmentId);
                if (!appointment) {
                    throw new Error("Cita no encontrada");
                }
                yield appointment.destroy();
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    checkForOverlappingAppointments(medicId, startAt, endAt, excludeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const whereClause = {
                    medic_id: medicId,
                    [sequelize_1.Op.or]: [
                        {
                            start_at: {
                                [sequelize_1.Op.between]: [new Date(startAt), new Date(endAt)],
                            },
                        },
                        {
                            end_at: {
                                [sequelize_1.Op.between]: [new Date(startAt), new Date(endAt)],
                            },
                        },
                        {
                            [sequelize_1.Op.and]: [
                                { start_at: { [sequelize_1.Op.lte]: new Date(startAt) } },
                                { end_at: { [sequelize_1.Op.gte]: new Date(endAt) } },
                            ],
                        },
                    ],
                };
                if (excludeId) {
                    whereClause.id = { [sequelize_1.Op.ne]: excludeId };
                }
                const overlappingAppointment = yield Appointment_1.default.findOne({
                    where: whereClause,
                });
                return overlappingAppointment;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AppointmentService = AppointmentService;
