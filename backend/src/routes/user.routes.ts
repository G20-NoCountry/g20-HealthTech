import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/auth/authenticated.middleware';
import { isEqualUserLogin } from '../middlewares/user/equalUserLogin.middleware';
import { canAccessPatient } from '../middlewares/user/canAccessPatient.middleware';

const router = Router();
const userController = new UserController;

router.use(isAuthenticated);

router.get("/patients/:id", canAccessPatient, userController.getPatient);
router.get("/medics/:id", isEqualUserLogin, userController.getMedic);

router.patch("/patients/:id", isEqualUserLogin, userController.updatePatient);
router.patch("/medics/:id", isEqualUserLogin, userController.updateMedic);

export default router;