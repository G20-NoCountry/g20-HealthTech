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

const validateEqualValue = (name: string, { req, path }: any) => {
    const user = req.user;
    if (!user) throw new Error('Usuario no autenticado');

    if (user[path] != name) return true;
};

export const userIdValidator = [
    param('id')
        .isNumeric().withMessage("Id debe ser numerico"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Errores de validación",
                data: errors.array(),
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
        .if(validateEqualValue)
        .custom(validateEmailExist).withMessage("email ya está registrado"),
    body('phone')
        .optional()
        .notEmpty()
        .withMessage('phone no puede estar vacío')
        .bail()
        .customSanitizer(value => value.replace(/\D/g, ''))
        .isLength({ min: 10, max: 13 })
        .isNumeric()
        .withMessage("phone no válido")
        .bail()
        .if(validateEqualValue)
        .custom(validatePhoneExist).withMessage("phone ya esta registrado"),
];