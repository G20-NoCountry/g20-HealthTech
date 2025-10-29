import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Medic from "../../models/Medic";

const validateSpeciality = async (specialty: string) => {
    const specialties = [
        "oftalmologia",
        "cardiologia", 
        "neurologia",
        "dermatologia",
        "pediatria",
        "ginecologia",
        "traumatologia",
        "psiquiatria",
        "medicina_general"
    ];
    if (!specialties.includes(specialty)) {
        throw new Error('speciality no válido');
    }
};

const validateLicenseNum = async (id: string) => {
    if (await Medic.findOne({ where: { license_num: id } })) {
        throw new Error('license_num ya está registrado');
    }
};

export const registerMedicValidator = [
    body('specialty')
        .notEmpty()
        .withMessage("specialty es obligatorio")
        .bail()
        .custom(validateSpeciality),
    body('licence_num')
        .notEmpty()
        .withMessage("licence_num es obligatorio")
        .bail()
        .isNumeric()
        .withMessage("licence_num debe ser numerico")
        .bail()
        .custom(validateLicenseNum),
    body('schedule_at')
        .notEmpty()
        .withMessage("schedule_at es obligatorio")
        .bail()
        .isISO8601()
        .withMessage("schedule_at debe ser una fecha"),

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
