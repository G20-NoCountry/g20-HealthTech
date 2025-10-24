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

/**
 * @swagger
 * /api/patients/:id:
 *   get:
 *     summary: Obtener un paciente
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Obtención del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/patients/:id", userIdValidator, canAccessPatient, userController.getPatient);

/**
 * @swagger
 * /api/patients/:id:
 *   patch:
 *     summary: Actualizar un paciente
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePatientRequest'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Actualización del paciente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/patients/:id", userIdValidator, isEqualUserLogin, updateUserValidator, updatePatientValidator, userController.updatePatient);

/**
 * @swagger
 * /api/medics/:id:
 *   get:
 *     summary: Obtener un medico
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del medico
 *     responses:
 *       200:
 *         description: Obtención del medico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/medics/:id", userIdValidator, canAccessMedic, userController.getMedic);

/**
 * @swagger
 * /api/medics/:id:
 *   patch:
 *     summary: Actualizar un medico
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMedicRequest'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del medico
 *     responses:
 *       200:
 *         description: Actualización del medico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/medics/:id", userIdValidator, isEqualUserLogin, canUpdateMedic, updateUserValidator, updateMedicValidator, userController.updateMedic);

export default router;