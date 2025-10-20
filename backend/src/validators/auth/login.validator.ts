import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

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