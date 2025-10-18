import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { HealthInsurance, Role, User } from "../../models";
import Medic from "../../models/Medic";

const validateEmail = async (email: string) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('email ya está registrado');
    }
};

const validateRoleId = async (id: number) => {
    const existingRole = await Role.findOne({ where: { id } });
    if (!existingRole) {
        throw new Error('role_id no válido');
    }
};

const validateHealthInsuranceId = async (id: number) => {
    if (!await HealthInsurance.findOne({ where: { id } })) {
        throw new Error('id_health_insurance no válido');
    }
};

const validateSpeciality = async (speciality: string) => {
    const specialities = [
        "oftalmologia",
        "cardiologia",
        "neurologia",
        "dermatologia",
        "pediatria",
        "ginecologia",
        "traumatologia",
        "psiquiatria",
        "medicina_general"
    ];
    if (!specialities.includes(speciality)) {
        throw new Error('speciality no válido');
    }
};

const validateLicenseNum = async (id: string) => {
    if (await Medic.findOne({ where: { license_num: id } })) {
        throw new Error('license_num ya está registrado');
    }
};

const patientValidator = async (data: any) => {
    if (!data?.id_health_insurance) {
        throw new Error("id_health_insurance es obligatorio");
    }
    await validateHealthInsuranceId(data.id_health_insurance);
    if (!data?.location) {
        throw new Error("location es obligatorio");
    }
    if (data.location.length < 3) {
        throw new Error("location debe tener mínimo 3 caracteres");
    }

};

const medicValidator = async (data: any) => {
    if (!data.speciality) {
        throw new Error("speciality es obligatorio");
    }
    await validateSpeciality(data.speciality);

    if (!data.license_num) {
        throw new Error("license_num es obligatorio");
    }
    await validateLicenseNum(data.license_num);

    if (!data.schedule_from) {
        throw new Error("schedule_from es obligatorio");
    }

    if (!data.schedule_to) {
        throw new Error("schedule_to es obligatorio");
    }

};

const getRoleNameById = async (id: number) => {
    const role = await Role.findOne({ where: { id } });
    if (!role) {
        throw new Error("role_id no válido");
    }
    return role.rol.toLowerCase();
};

const validateDataParam = async (data: any, obj: { req: any }) => {
    const roleName = await getRoleNameById(obj.req.body.role_id);

    if (roleName === "patient") {
        await patientValidator(data);
    }
    else if (roleName === "doctor") {
        await medicValidator(data);
    }

    return true;
};

export const registerValidator = [
    body('first_name')
        .notEmpty()
        .withMessage('first_name es obligatorio')
        .isAlpha()
        .withMessage('first_name de contener caracteres alfabeticos')
        .bail()
        .isLength({ min: 3 })
        .withMessage('first_name debe tener mínimo 3 caracteres'),
    body('last_name')
        .notEmpty()
        .withMessage('last_name es obligatorio')
        .isAlpha()
        .withMessage('last_name debe contener caracteres alfabeticos')
        .bail()
        .isLength({ min: 3 })
        .withMessage('last_name debe tener mínimo 3 caracteres'),
    body('email')
        .notEmpty()
        .withMessage('email es obligatorio')
        .isEmail()
        .withMessage('email no válido')
        .bail()
        .custom(validateEmail)
        .withMessage('email ya está registrado'),
    body('password')
        .notEmpty()
        .withMessage('password es obligatorio')
        .bail()
        .isString()
        .isLength({ min: 4 })
        .withMessage('password debe tener mínimo 4 caracteres')
        .isLength({ max: 60 })
        .withMessage('password debe tener máximo 60 caracteres'),
    body('phone')
        .optional()
        .notEmpty()
        .withMessage('phone no puede estar vacío')
        .bail()
        .customSanitizer(value => value.replace(/\D/g, ''))
        .isMobilePhone("es-AR")
        .withMessage('phone no válido'),
    body('role_id')
        .isNumeric()
        .withMessage('role_id debe ser numerico')
        .bail()
        .custom(validateRoleId)
        .withMessage('role_id no válido'),
    body('data')
        .notEmpty()
        .isObject()
        .withMessage("data es obligatorio")
        .custom(validateDataParam),

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