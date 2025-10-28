import { Router, RequestHandler } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { createAppointmentValidator } from "../validators/appointment/createAppointment.validator";
import { updateAppointmentValidator } from "../validators/appointment/updateAppointment.validator";
import { validationResult } from "express-validator";
import { isAuthenticated } from "../middlewares/auth/authenticated.middleware";
import { 
  canDeleteMedicAppointment, 
  canDeletePatientAppointment,
  canUpdateMedicAppointment,
  canUpdatePatientAppointment 
} from "../middlewares/appointment/appointmentAuthorization.middleware";

const router = Router();
const appointmentController = new AppointmentController();

// Asegurar que el usuario esté autenticado para todas las rutas de citas
router.use(isAuthenticated);

// Ruta para verificar disponibilidad de citas
router.get(
  "/appointments/availability",
  appointmentController.getAvailability
);

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

// Medic routes (mirroring patient routes behavior)
router.post(
  "/medic/appointments",
  createAppointmentValidator,
  handleValidationErrors,
  appointmentController.createAppointmentAsMedic
);

router.get("/medic/appointments", appointmentController.getMedicAppointments);

router.get(
  "/medic/appointments/:id",
  appointmentController.getMedicAppointmentById
);

// Use PATCH and receive all fields in body, like patient routes
router.patch(
  "/medic/appointments",
  updateAppointmentValidator,
  handleValidationErrors,
  canUpdateMedicAppointment,
  appointmentController.updateMedicAppointment
);

// Validar que el medico sea el dueño de la cita antes de cancelar
router.delete(
  "/medic/appointments/:id",
  canDeleteMedicAppointment,
  appointmentController.cancelMedicAppointment
);

// Restaurar cita cancelada (médico)
router.patch(
  "/medic/appointments/:id/restore",
  canDeleteMedicAppointment,
  appointmentController.restoreMedicAppointment
);

// Obtener citas canceladas (médico)
router.get(
  "/medic/appointments/cancelled",
  appointmentController.getCancelledMedicAppointments
);

// Patient routes

// Solicitar desde el body las id en métodos post
router.post(
  "/paciente/appointments",
  createAppointmentValidator,
  handleValidationErrors,
  appointmentController.createAppointmentAsPatient
);

router.get(
  "/paciente/appointments",
  appointmentController.getPatientAppointments
);

router.get(
  "/paciente/appointments/:id",
  appointmentController.getPatientAppointmentById
);

// Refactorización de ruta para hacer todos los cambios del body, cuidado con usar put para actualización de valores, mejor patch
router.patch(
  "/paciente/appointments",
  updateAppointmentValidator,
  handleValidationErrors,
  canUpdatePatientAppointment,
  appointmentController.updatePatientAppointment
);

// Nueva ruta: Médicos pueden actualizar citas de pacientes (para agregar síntomas, diagnósticos, etc.)
router.patch(
  "/medic/patient-appointments",
  updateAppointmentValidator,
  handleValidationErrors,
  canUpdatePatientAppointment,
  appointmentController.updatePatientAppointmentAsMedic
);

// Validar que el paciente sea el dueño de la cita antes de cancelar
router.delete(
  "/paciente/appointments/:id",
  canDeletePatientAppointment,
  appointmentController.cancelPatientAppointment
);

// Restaurar cita cancelada (paciente)
router.patch(
  "/paciente/appointments/:id/restore",
  canDeletePatientAppointment,
  appointmentController.restorePatientAppointment
);

// Obtener citas canceladas (paciente)
router.get(
  "/paciente/appointments/cancelled",
  appointmentController.getCancelledPatientAppointments
);

export default router;
