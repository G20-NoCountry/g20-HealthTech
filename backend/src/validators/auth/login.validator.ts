import { body } from "express-validator";

export const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('email no válido'),
    body('password')
        .isString()
        .isLength({ min: 4 })
        .withMessage('password debe tener mínimo 4 caracteres')
        .isLength({ max: 60 })
        .withMessage('password debe tener máximo 60 caracteres'),
];