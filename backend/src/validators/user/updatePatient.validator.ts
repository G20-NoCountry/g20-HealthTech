import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { HealthInsurance } from "../../models";

const validateHealthInsuranceId = async (id: number) => {
    if (!await HealthInsurance.findOne({ where: { id: id } })) {
        throw new Error('id_health_insurance no válido');
    }
};

const validateBloodTypeExist = async (bloodType: string) => {
    const bloodTypes = [
        "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
    ];
    if (!bloodTypes.includes(bloodType)) {
        throw new Error('blood_type no válido');
    }
};

export const updatePatientValidator = [
    body("id_health_insurance")
        .optional()
        .notEmpty().withMessage("id_health_insurance es obligatorio")
        .bail()
        .isNumeric().withMessage("id_health_insurance debe ser numerico")
        .custom(validateHealthInsuranceId).withMessage("id_health_insurance no válido")
    ,
    body("location")
        .optional()
        .notEmpty().withMessage("location no puede estar vacio")
        .bail()
        .isString().withMessage("location debe ser un string")
        .bail()
        .isLength({ min: 3 }).withMessage('location debe tener mínimo 3 caracteres')
    ,
    body("blood_type")
        .optional()
        .notEmpty().withMessage("blood_type no puede estar vacio")
        .bail()
        .custom(validateBloodTypeExist)
    ,
    body("alergias")
        .optional()
        .notEmpty().withMessage("alergias no puede estar vacio")
        .bail()
        .isString().withMessage('alergias de ser un string')
        .bail()
        .isLength({ min: 2 }).withMessage('alergias debe tener mínimo 2 caracteres')
    ,
    body("cronicas_condition")
        .optional()
        .notEmpty().withMessage("cronicas_condition no puede estar vacio")
        .isString().withMessage('alergias de contener caracteres alfanumericos')
        .bail()
        .isLength({ min: 2 }).withMessage('alergias debe tener mínimo 2 caracteres')
    ,

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