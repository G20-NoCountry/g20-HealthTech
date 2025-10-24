import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const registerPatientValidator = [
  body("health_insurance")
    .bail()
    .isIn([
      "OSECAC",
      "OSPRERA",
      "UPCN",
      "OBSBA",
      "OSDEPYM",
      "OSUTHGRA",
      "OSPE",
      "OSPECON",
      "OSIAD",
      "OSSEG",
    ])
    .withMessage("Obra social no válida"),
  body("location")
    .notEmpty()
    .withMessage("Ubicación es obligatoria")
    .bail()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Ubicación no válida"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];
