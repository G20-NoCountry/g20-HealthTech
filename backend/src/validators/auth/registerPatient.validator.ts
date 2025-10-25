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
    .withMessage("health_insurance no válida"),
  body("location")
    .notEmpty()
    .withMessage("location es obligatoria")
    .bail()
    .isString()
    .isLength({ min: 3 })
    .withMessage("location no válida"),

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
