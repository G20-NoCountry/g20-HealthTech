import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const validateHealthInsuranceId = async (healthInsurance: string) => {
    const healthInsurances = [
        "OSECAC",
        "OSPRERA",
        "UPCN",
        "OBSBA",
        "OSDEPYM",
        "OSUTHGRA",
        "OSPE",
        "OSPECON",
        "OSIAD",
        "OSSEG"
    ];
    if (!healthInsurances.includes(healthInsurance)) {
        throw new Error('health_insurance no válido');
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
    body("health_insurance")
        .optional()
        .notEmpty().withMessage("health_insurance es obligatorio")
        .bail()
        .isString().withMessage("health_insurance debe ser string")
        .custom(validateHealthInsuranceId).withMessage("health_insurance no válido")
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
    body("actual_medication")
        .optional()
        .notEmpty().withMessage("actual_medication no puede estar vacio")
        .isString().withMessage('actual_medication de contener caracteres alfanumericos')
        .bail()
        .isLength({ min: 2 }).withMessage('actual_medication debe tener mínimo 2 caracteres')
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