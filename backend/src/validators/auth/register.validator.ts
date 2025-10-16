import { body } from "express-validator";

export const registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Email no válido'),
    body('password')
        .isLength({ min: 3 })
        .withMessage('Contraseña debe tener minimo 3 caracteres'),
    body('first_name')
        .notEmpty().trim().escape()
        .withMessage("El nombre es obligatorio"),
    body('last_name')
        .notEmpty().trim().escape()
        .withMessage("El apellido es obligatorio"),
    body('phone')
        .isLength({ min: 10, max: 10 })
        .withMessage(""),
    body('is_active')
        .optional({ nullable: false }).isBoolean().default(true),
    body('role_id')
        .isNumeric()
];