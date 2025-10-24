"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("../controllers/appointment.controller");
const createAppointment_validator_1 = require("../validators/appointment/createAppointment.validator");
const updateAppointment_validator_1 = require("../validators/appointment/updateAppointment.validator");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const appointmentController = new appointment_controller_1.AppointmentController();
// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Errores de validación",
            data: errors.array(),
        });
    }
    next();
};
// Medic routes
router.post("/medic/appointments/:medic_id", createAppointment_validator_1.createAppointmentValidator, handleValidationErrors, appointmentController.createAppointmentAsMedic);
router.get("/medic/appointments/", appointmentController.getMedicAppointments);
router.get("/medic/appointments/:id", appointmentController.getMedicAppointmentById);
router.put("/medic/appointments/:paciente_id/:id_cita", updateAppointment_validator_1.updateAppointmentValidator, handleValidationErrors, appointmentController.updateMedicAppointment);
router.delete("/medic/appointments/:paciente_id/:id_cita", appointmentController.deleteMedicAppointment);
// Patient routes
router.post("/paciente/appointments/:paciente_id", createAppointment_validator_1.createAppointmentValidator, handleValidationErrors, appointmentController.createAppointmentAsPatient);
router.get("/paciente/appointments/", appointmentController.getPatientAppointments);
router.get("/paciente/appointments/:id", appointmentController.getPatientAppointmentById);
router.put("/paciente/appointments/:medic_id/:id_cita", updateAppointment_validator_1.updateAppointmentValidator, handleValidationErrors, appointmentController.updatePatientAppointment);
router.delete("/paciente/appointments/:medic_id/:id_cita", appointmentController.deletePatientAppointment);
exports.default = router;
