import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import passport from 'passport';
import { isAuthenticated } from '../middlewares/auth/authenticated.middleware';
import { isNotAuthenticated } from '../middlewares/auth/notAuthenticated.middleware';
import { registerValidator } from '../validators/auth/register.validator';
import { loginValidator } from '../validators/auth/login.validator';

const router = Router();
const authController = new AuthController();

router.post('/login', isNotAuthenticated, loginValidator, passport.authenticate("local"), authController.login);
router.post('/register', registerValidator, isNotAuthenticated, authController.register);
router.get('/user', isAuthenticated, authController.user);
router.delete('/logout', isAuthenticated, authController.logout);

export default router;