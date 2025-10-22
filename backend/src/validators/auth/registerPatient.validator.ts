import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { HealthInsurance } from "../../models";

const validateHealthInsuranceId = async (id: number) => {
    if (!await HealthInsurance.findOne({ where: { id: id } })) {
        throw new Error('id_health_insurance no válido');
    }
};

export const registerPatientValidator = [
    body("id_health_insurance")
        .notEmpty()
        .withMessage("id_health_insurance es obligatorio")
        .bail()
        .custom(validateHealthInsuranceId)
        .withMessage(""),
    body("location")
        .notEmpty()
        .withMessage("location es obligatorio")
        .bail()
        .isString()
        .isLength({ min: 3 }),

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