"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../../models");
const validateEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield models_1.User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('email ya está registrado');
    }
});
const validateRoleId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingRole = yield models_1.Role.findOne({ where: { id } });
    if (!existingRole) {
        throw new Error('role_id no válido');
    }
});
exports.registerValidator = [
    (0, express_validator_1.body)('first_name')
        .notEmpty()
        .withMessage('first_name es obligatorio')
        .isAlpha()
        .withMessage('first_name de contener caracteres alfabeticos')
        .bail()
        .isLength({ min: 3 })
        .withMessage('first_name debe tener mínimo 3 caracteres'),
    (0, express_validator_1.body)('last_name')
        .notEmpty()
        .withMessage('last_name es obligatorio')
        .isAlpha()
        .withMessage('last_name debe contener caracteres alfabeticos')
        .bail()
        .isLength({ min: 3 })
        .withMessage('last_name debe tener mínimo 3 caracteres'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('email es obligatorio')
        .isEmail()
        .withMessage('email no válido')
        .bail()
        .custom(validateEmail),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('password es obligatorio')
        .bail()
        .isString()
        .isLength({ min: 4 })
        .withMessage('password debe tener mínimo 4 caracteres')
        .isLength({ max: 60 })
        .withMessage('password debe tener máximo 60 caracteres'),
    (0, express_validator_1.body)('phone')
        .optional()
        .notEmpty()
        .withMessage('phone no puede estar vacío')
        .bail()
        .customSanitizer(value => value.replace(/\D/g, ''))
        .isMobilePhone("es-AR")
        .withMessage('phone no válido'),
    (0, express_validator_1.body)('role_id')
        .isNumeric()
        .withMessage('role_id debe ser numerico')
        .bail()
        .custom(validateRoleId),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        next();
    }
];
