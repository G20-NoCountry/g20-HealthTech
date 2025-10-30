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
import { validationResult } from "express-validator";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints para autenticación de usuarios
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

router.post(
  "/login",
  isNotAuthenticated,
  loginValidator,
  handleValidationErrors,
  passport.authenticate("local"),
  authController.login
);

router.post(
  "/register/patient",
  isNotAuthenticated,
  registerValidator,
  registerPatientValidator,
  handleValidationErrors,
  authController.registerPatient
);

// No se debe estar logeado para registrar médicos
router.post(
  "/register/medic",
  isNotAuthenticated,
  isAdmin,
  registerValidator,
  registerMedicValidator,
  handleValidationErrors,
  authController.registerMedic
);

router.get("/user", isAuthenticated, authController.user);

router.post("/logout", isAuthenticated, authController.logout);

export default router;
