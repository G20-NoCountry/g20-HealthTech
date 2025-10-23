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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMedicValidator = void 0;
const express_validator_1 = require("express-validator");
const Medic_1 = __importDefault(require("../../models/Medic"));
const validateSpeciality = (speciality) => __awaiter(void 0, void 0, void 0, function* () {
    const specialities = [
        "oftalmologia",
        "cardiologia",
        "neurologia",
        "dermatologia",
        "pediatria",
        "ginecologia",
        "traumatologia",
        "psiquiatria",
        "medicina_general",
    ];
    if (!specialities.includes(speciality)) {
        throw new Error("speciality no válido");
    }
});
const validateLicenseNum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield Medic_1.default.findOne({ where: { licence_num: parseInt(id) } })) {
        throw new Error("licence_num ya está registrado");
    }
});
exports.registerMedicValidator = [
    (0, express_validator_1.body)("speciality")
        .notEmpty()
        .withMessage("speciality es obligatorio")
        .bail()
        .custom(validateSpeciality),
    (0, express_validator_1.body)("licence_num")
        .notEmpty()
        .withMessage("licence_num es obligatorio")
        .bail()
        .custom(validateLicenseNum),
    (0, express_validator_1.body)("schedule_from")
        .notEmpty()
        .withMessage("schedule_from es obligatorio")
        .bail()
        .isISO8601()
        .withMessage("schedule_from debe ser una fecha"),
    (0, express_validator_1.body)("schedule_to")
        .notEmpty()
        .withMessage("schedule_to es obligatorio")
        .bail()
        .isISO8601()
        .withMessage("schedule_to debe ser una fecha"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        next();
    },
];
