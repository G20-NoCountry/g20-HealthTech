import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Medic from "../../models/Medic";

const validateSpeciality = async (speciality: string) => {
  const specialties = [
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
  if (!specialties.includes(speciality)) {
    throw new Error("speciality no válido");
  }
};

const validateLicenseNum = async (id: string) => {
  if (await Medic.findOne({ where: { license_num: id } })) {
    throw new Error("license_num ya está registrado");
  }
};

export const registerMedicValidator = [
  body("speciality")
    .notEmpty()
    .withMessage("speciality es obligatorio")
    .bail()
    .custom(validateSpeciality),
  body("license_num")
    .notEmpty()
    .withMessage("license_num es obligatorio")
    .bail()
    .isNumeric()
    .withMessage("license_num debe ser numerico")
    .bail()
    .custom(validateLicenseNum),
  body("schedule_at")
    .notEmpty()
    .withMessage("schedule_at es obligatorio")
    .bail()
    .isISO8601()
    .withMessage("schedule_at debe ser una fecha"),
];
