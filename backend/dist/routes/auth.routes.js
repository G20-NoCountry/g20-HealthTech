"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const passport_1 = __importDefault(require("passport"));
const authenticated_middleware_1 = require("../middlewares/auth/authenticated.middleware");
const notAuthenticated_middleware_1 = require("../middlewares/auth/notAuthenticated.middleware");
const login_validator_1 = require("../validators/auth/login.validator");
const register_validator_1 = require("../validators/auth/register.validator");
const admin_middleware_1 = require("../middlewares/auth/admin.middleware");
const registerPatient_validator_1 = require("../validators/auth/registerPatient.validator");
const registerMedic_validator_1 = require("../validators/auth/registerMedic.validator");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints para autenticación de usuarios
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: Credenciales inválidas
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
router.post("/login", notAuthenticated_middleware_1.isNotAuthenticated, login_validator_1.loginValidator, passport_1.default.authenticate("local"), authController.login);
/**
 * @swagger
 * /api/auth/register/patient:
 *   post:
 *     summary: Registrar un nuevo paciente
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPatientRequest'
 *     responses:
 *       201:
 *         description: Paciente registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Datos de entrada inválidos
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
router.post("/register/patient", notAuthenticated_middleware_1.isNotAuthenticated, register_validator_1.registerValidator, registerPatient_validator_1.registerPatientValidator, authController.registerPatient);
/**
 * @swagger
 * /api/auth/register/medic:
 *   post:
 *     summary: Registrar un nuevo médico (solo médicos)
 *     tags: [Authentication]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterMedicRequest'
 *     responses:
 *       201:
 *         description: Médico registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado - requiere autenticación de médico
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
router.post("/register/medic", authenticated_middleware_1.isAuthenticated, admin_middleware_1.isAdmin, register_validator_1.registerValidator, registerMedic_validator_1.registerMedicValidator, authController.registerMedic);
/**
 * @swagger
 * /api/auth/user:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     tags: [Authentication]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuario encontrado!
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado - requiere autenticación
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
router.get("/user", authenticated_middleware_1.isAuthenticated, authController.user);
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión del usuario
 *     tags: [Authentication]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       204:
 *         description: Sesión cerrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cierre de sesión exitoso
 *                 data:
 *                   type: null
 *                   example: null
 *       401:
 *         description: No autorizado - requiere autenticación
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
router.post("/logout", authenticated_middleware_1.isAuthenticated, authController.logout);
exports.default = router;
