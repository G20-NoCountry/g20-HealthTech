import { NextFunction, Request, Response } from "express";
import { param, validationResult } from "express-validator";

export const patientIdValidator = [
    param('patient_id')
        .isNumeric().withMessage("patient_id debe ser numerico"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        next();
    }
];