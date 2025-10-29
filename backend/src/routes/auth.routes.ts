import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import passport from "passport";
import { isAuthenticated } from "../middlewares/auth/authenticated.middleware";
import { isNotAuthenticated } from "../middlewares/auth/notAuthenticated.middleware";
import { loginValidator } from "../validators/auth/login.validator";
import { registerValidator } from "../validators/auth/register.validator";
import { isAdmin } from "../middlewares/auth/admin.middleware";
import { registerPatientValidator } from "../validators/auth/registerPatient.validator";
import { registerMedicValidator } from "../validators/auth/registerMedic.validator";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints para autenticación de usuarios
 */

router.post(
  "/login",
  isNotAuthenticated,
  loginValidator,
  passport.authenticate("local"),
  authController.login
);

router.post(
  "/register/patient",
  isNotAuthenticated,
  registerValidator,
  registerPatientValidator,
  authController.registerPatient
);

// No se debe estar logeado para registrar médicos
router.post(
  "/register/medic",
  isNotAuthenticated,
  isAdmin,
  registerValidator,
  registerMedicValidator,
  authController.registerMedic
);

router.get("/user", isAuthenticated, authController.user);

router.post("/logout", isAuthenticated, authController.logout);

export default router;
