import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/auth/authenticated.middleware';
import { canAccessPatient } from '../middlewares/user/canAccessPatient.middleware';
import { updateUserValidator, userIdValidator } from '../validators/user/updateUser.validator';
import { updatePatientValidator } from '../validators/user/updatePatient.validator';
import { updateMedicValidator } from '../validators/user/updateMedic.validator';
import { canAccessMedic } from '../middlewares/user/canAccessMedic.middleware';
import { validationResult } from 'express-validator';

const router = Router();
const userController = new UserController;

router.use(isAuthenticated);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestionar usuarios
 */

const handleValidationErrors = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Errores de validación",
            data: errors.array(),
        });
    }
    next();
};

router.get("/medics/summary", userController.getMedicsSummary);

router.get("/patients/:id", userIdValidator, canAccessPatient, userController.getPatient);
router.patch("/patients", updateUserValidator, updatePatientValidator, handleValidationErrors, userController.updatePatient);

router.get("/medics/:id", userIdValidator, canAccessMedic, userController.getMedic);
router.patch("/medics", updateUserValidator, updateMedicValidator, handleValidationErrors, userController.updateMedic);

export default router;