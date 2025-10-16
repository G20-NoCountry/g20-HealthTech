import { body } from "express-validator";

export const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('Email no válido'),
    body('password')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Contraseña debe tener minimo 3 caracteres'),
];