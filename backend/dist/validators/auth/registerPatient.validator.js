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
exports.registerPatientValidator = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../../models");
const validateHealthInsuranceId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield models_1.HealthInsurance.findOne({ where: { id: id } }))) {
        throw new Error('id_health_insurance no válido');
    }
});
exports.registerPatientValidator = [
    (0, express_validator_1.body)("id_health_insurance")
        .notEmpty()
        .withMessage("id_health_insurance es obligatorio")
        .bail()
        .custom(validateHealthInsuranceId)
        .withMessage(""),
    (0, express_validator_1.body)("location")
        .notEmpty()
        .withMessage("location es obligatorio")
        .bail()
        .isString()
        .isLength({ min: 3 }),
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
