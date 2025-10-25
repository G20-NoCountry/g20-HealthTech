import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/auth/authenticated.middleware';
import { isEqualUserLogin } from '../middlewares/user/equalUserLogin.middleware';
import { canAccessPatient } from '../middlewares/user/canAccessPatient.middleware';
import { canUpdateMedic } from '../middlewares/user/canUpdateMedic.middleware';
import { updateUserValidator, userIdValidator } from '../validators/user/updateUser.validator';
import { updatePatientValidator } from '../validators/user/updatePatient.validator';
import { updateMedicValidator } from '../validators/user/updateMedic.validator';
import { canAccessMedic } from '../middlewares/user/canAccessMedic.middleware';

const router = Router();
const userController = new UserController;

router.use(isAuthenticated);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestionar usuarios
 */

router.get("/patients/:id", userIdValidator, canAccessPatient, userController.getPatient);
router.patch("/patients/:id", userIdValidator, isEqualUserLogin, updateUserValidator, updatePatientValidator, userController.updatePatient);

router.get("/medics/:id", userIdValidator, canAccessMedic, userController.getMedic);
router.patch("/medics/:id", userIdValidator, isEqualUserLogin, canUpdateMedic, updateUserValidator, updateMedicValidator, userController.updateMedic);

export default router;