import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../../models";

const validateEmail = async (email: string) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("email ya está registrado");
  }
};

export const registerValidator = [
  body("first_name")
    .notEmpty()
    .withMessage("first_name es obligatorio")
    .isAlpha()
    .withMessage("first_name de contener caracteres alfabeticos")
    .bail()
    .isLength({ min: 3 })
    .withMessage("first_name debe tener mínimo 3 caracteres"),
  body("last_name")
    .notEmpty()
    .withMessage("last_name es obligatorio")
    .isAlpha()
    .withMessage("last_name debe contener caracteres alfabeticos")
    .bail()
    .isLength({ min: 3 })
    .withMessage("last_name debe tener mínimo 3 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("email es obligatorio")
    .isEmail()
    .withMessage("email no válido")
    .bail()
    .custom(validateEmail),
  body("password")
    .notEmpty()
    .withMessage("password es obligatorio")
    .bail()
    .isString()
    .isLength({ min: 4 })
    .withMessage("password debe tener mínimo 4 caracteres")
    .isLength({ max: 60 })
    .withMessage("password debe tener máximo 60 caracteres"),
  body("phone")
    .optional()
    .notEmpty()
    .withMessage("phone no puede estar vacío")
    .bail()
    .customSanitizer((value) => value.replace(/\D/g, ""))
    .isMobilePhone("es-AR")
    .withMessage("phone no válido"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];
