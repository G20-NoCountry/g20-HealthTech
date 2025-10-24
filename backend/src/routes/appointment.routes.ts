import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { createAppointmentValidator } from "../validators/appointment/createAppointment.validator";
import { updateAppointmentValidator } from "../validators/appointment/updateAppointment.validator";
import { validationResult } from "express-validator";

const router = Router();
const appointmentController = new AppointmentController();

// Middleware to handle validation errors
const handleValidationErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
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
router.post(
  "/medic/appointments/:medic_id",
  createAppointmentValidator,
  handleValidationErrors,
  appointmentController.createAppointmentAsMedic
);

router.get("/medic/appointments/", appointmentController.getMedicAppointments);

router.get(
  "/medic/appointments/:id",
  appointmentController.getMedicAppointmentById
);

router.put(
  "/medic/appointments/:paciente_id/:id_cita",
  updateAppointmentValidator,
  handleValidationErrors,
  appointmentController.updateMedicAppointment
);

router.delete(
  "/medic/appointments/:paciente_id/:id_cita",
  appointmentController.deleteMedicAppointment
);

// Patient routes
router.post(
  "/paciente/appointments/:paciente_id",
  createAppointmentValidator,
  handleValidationErrors,
  appointmentController.createAppointmentAsPatient
);

router.get(
  "/paciente/appointments/",
  appointmentController.getPatientAppointments
);

router.get(
  "/paciente/appointments/:id",
  appointmentController.getPatientAppointmentById
);

router.put(
  "/paciente/appointments/:medic_id/:id_cita",
  updateAppointmentValidator,
  handleValidationErrors,
  appointmentController.updatePatientAppointment
);

router.delete(
  "/paciente/appointments/:medic_id/:id_cita",
  appointmentController.deletePatientAppointment
);

export default router;
