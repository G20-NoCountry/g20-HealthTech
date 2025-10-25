import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { User } from "../../models";

const validateEmailExist = async (email: string) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('email ya está registrado');
    }
};

const validatePhoneExist = async (phone: string) => {
    const existingPhone = await User.findOne({ where: { phone: phone } });
    if (existingPhone) {
        throw new Error('phone ya está registrado');
    }
};

export const userIdValidator = [
    param('id')
        .isNumeric().withMessage("Id debe ser numerico"),

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

export const updateUserValidator = [
    body()
        .exists()
        .withMessage("object es obligatorio"),
    body('first_name')
        .optional()
        .notEmpty()
        .withMessage('first_name es obligatorio')
        .bail()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)
        .withMessage('first_name de contener caracteres alfabeticos')
        .bail()
        .isLength({ min: 3 })
        .withMessage('first_name debe tener mínimo 3 caracteres'),
    body('last_name')
        .optional()
        .notEmpty()
        .withMessage('last_name es obligatorio')
        .bail()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)
        .withMessage('last_name debe contener caracteres alfabeticos')
        .bail()
        .isLength({ min: 3 })
        .withMessage('last_name debe tener mínimo 3 caracteres'),
    body('email')
        .optional()
        .notEmpty()
        .withMessage('email es obligatorio')
        .bail()
        .isEmail()
        .withMessage('email no válido')
        .bail()
        .custom(validateEmailExist),
    body('phone')
        .optional()
        .optional()
        .notEmpty()
        .withMessage('phone no puede estar vacío')
        .bail()
        .customSanitizer(value => value.replace(/\D/g, ''))
        .isMobilePhone("es-AR")
        .withMessage('phone no válido')
        .bail()
        .custom(validatePhoneExist),

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