import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Medic from "../../models/Medic";

const validateSpeciality = async (speciality: string) => {
    const specialities = [
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
    if (!specialities.includes(speciality)) {
        throw new Error('speciality no válido');
    }
};

const validateLicenseNum = async (id: string) => {
    if (await Medic.findOne({ where: { license_num: id } })) {
        throw new Error('license_num ya está registrado');
    }
};

export const registerMedicValidator = [
    body('speciality')
        .notEmpty()
        .withMessage("speciality es obligatorio")
        .bail()
        .custom(validateSpeciality),
    body('license_num')
        .notEmpty()
        .withMessage("license_num es obligatorio")
        .bail()
        .custom(validateLicenseNum),
    body('schedule_from')
        .notEmpty()
        .withMessage("schedule_from es obligatorio")
        .bail()
        .isISO8601()
        .withMessage("schedule_from debe ser una fecha"),
    body('schedule_to')
        .notEmpty()
        .withMessage("schedule_to es obligatorio")
        .bail()
        .isISO8601()
        .withMessage("schedule_to debe ser una fecha"),

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