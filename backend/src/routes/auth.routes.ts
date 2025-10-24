import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import passport from 'passport';
import { isAuthenticated } from '../middlewares/auth/authenticated.middleware';
import { isNotAuthenticated } from '../middlewares/auth/notAuthenticated.middleware';
import { loginValidator } from '../validators/auth/login.validator';
import { registerValidator } from '../validators/auth/register.validator';
import { registerPatientValidator } from '../validators/auth/registerPatient.validator';
import { registerMedicValidator } from '../validators/auth/registerMedic.validator';

const router = Router();
const authController = new AuthController();

router.post('/login', isNotAuthenticated, loginValidator, passport.authenticate("local"), authController.login);
router.post('/register/patient', isNotAuthenticated, registerValidator, registerPatientValidator, authController.registerPatient);
router.post('/register/medic', isAuthenticated, registerValidator, registerMedicValidator, authController.registerMedic);
router.get('/user', isAuthenticated, authController.user);
router.post('/logout', isAuthenticated, authController.logout);

export default router;