import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Medic from "../../models/Medic";

const validateLicenseNum = async (id: string) => {
    if (await Medic.findOne({ where: { license_num: id } })) {
        throw new Error('license_num ya está registrado');
    }
};

export const updateMedicValidator = [
    body('license_num')
        .optional()
        .notEmpty()
        .withMessage("license_num no puede estar vacío")
        .bail()
        .isNumeric()
        .withMessage("license_num debe ser numerico")
        .bail()
        .custom(validateLicenseNum)
    ,

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