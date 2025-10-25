import { body, ValidationChain } from "express-validator";

export const updateAppointmentValidator: ValidationChain[] = [
  body("start_at")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe tener formato ISO8601")
    .custom((value) => {
      if (value) {
        const appointmentDate = new Date(value);
        const now = new Date();

        if (appointmentDate <= now) {
          throw new Error("La cita debe ser programada para una fecha futura");
        }
      }

      return true;
    }),

  body("end_at")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe tener formato ISO8601")
    .custom((value, { req }) => {
      if (value && req.body.start_at) {
        const startDate = new Date(req.body.start_at);
        const endDate = new Date(value);

        if (endDate <= startDate) {
          throw new Error(
            "La hora de fin debe ser posterior a la hora de inicio"
          );
        }
      }

      return true;
    }),

  body("type")
    .optional()
    .isIn(["in_person", "virtual"])
    .withMessage("El tipo debe ser 'in_person' o 'virtual'"),

  body("location")
    .optional()
    .isString()
    .withMessage("La ubicación debe ser un texto")
    .isLength({ max: 255 })
    .withMessage("La ubicación no puede exceder 255 caracteres"),

  body("symptoms")
    .optional()
    .isString()
    .withMessage("Los síntomas deben ser texto")
    .isLength({ max: 100 })
    .withMessage("Los síntomas no pueden exceder 100 caracteres"),

  body("diagnostic")
    .optional()
    .isString()
    .withMessage("El diagnóstico debe ser texto")
    .isLength({ max: 100 })
    .withMessage("El diagnóstico no puede exceder 100 caracteres"),
];
