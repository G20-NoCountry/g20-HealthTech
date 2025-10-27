import { Router, RequestHandler } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { createAppointmentValidator } from "../validators/appointment/createAppointment.validator";
import { updateAppointmentValidator } from "../validators/appointment/updateAppointment.validator";
import { validationResult } from "express-validator";
import { isAuthenticated } from "../middlewares/auth/authenticated.middleware";

const router = Router();
const appointmentController = new AppointmentController();

//$ [FIX] - Asegurarse de que el usuario esté autenticado para todas las rutas de citas.
router.use(isAuthenticated);

//$ [ADD] - Ruta para verificar disponibilidad de citas
// router.get(
//   "/appointments/availability",
//   // appointmentController.getAvailability
// );

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
  appointmentController.updateMedicAppointment
);

//$ [TASK] - Validar que el medico sea el dueño de la cita antes de eliminar.
router.delete(
  "/medic/appointments/:id",
  appointmentController.deleteMedicAppointment
);

// Patient routes

//$ [FIX] - Solicitar desde el body las id en métodos post.
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

//$ [FIX] - Refactorización de ruta para hacer todos los cambios del body, cuidado con usar put para actualización de valores, mejor patch.
router.patch(
  "/paciente/appointments",
  updateAppointmentValidator,
  handleValidationErrors,
  appointmentController.updatePatientAppointment
);

//$ [TASK] - Validar que el paciente sea el dueño de la cita antes de eliminar.
router.delete(
  "/paciente/appointments/:id",
  appointmentController.deletePatientAppointment
);

export default router;
