import { body } from "express-validator";
import Medic from "../../models/Medic";

const validateLicenseNum = async (value: string, { req, path }: any) => {
    const user = req.user;
    if (!user) throw new Error('Usuario no autenticado');

    const medic: any = await Medic.findByPk(user.id);
    if (!medic) throw new Error('Médico no encontrado');

    if (medic[path] === value) {
        return true;
    }

    const existing = await Medic.findOne({ where: { [path]: value } });
    if (existing) {
        throw new Error("license_num ya está registrado");
    }

    return true;
};

export const updateMedicValidator = [
    body("speciality")
        .notEmpty()
        .withMessage("speciality es obligatorio")
        .bail()
        .isIn([
            "oftalmologia",
            "cardiologia",
            "neurologia",
            "dermatologia",
            "pediatria",
            "ginecologia",
            "traumatologia",
            "psiquiatria",
            "medicina_general"
        ]).withMessage("speciality no válido")
    ,
    body('license_num')
        .optional()
        .notEmpty().withMessage("license_num no puede estar vacío")
        .bail()
        .isNumeric().withMessage("license_num debe ser numerico")
        .bail()
        .custom(validateLicenseNum)
    ,
];