"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('email no válido'),
    (0, express_validator_1.body)('password')
        .isString()
        .isLength({ min: 4 })
        .withMessage('password debe tener mínimo 4 caracteres')
        .isLength({ max: 60 })
        .withMessage('password debe tener máximo 60 caracteres'),
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
