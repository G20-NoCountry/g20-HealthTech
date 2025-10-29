import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { RegisterPatientDto } from "../dto/user/registerPatient.dto";
import { RegisterMedicDto } from "../dto/user/registerMedic.dto";
import { User } from "../models";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints para autenticación y gestión de usuarios
 */
export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Iniciar sesión de usuario
   *     description: Autentica un usuario con email y contraseña
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
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Inicio de sesión exitoso!"
   *                 data:
   *                   $ref: '#/components/schemas/FullPatient'
   *       400:
   *         description: Datos de entrada inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BadRequest'
   *       401:
   *         description: Credenciales inválidas
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Unauthorized'
   *       409:
   *         description: Existe una sesión iniciada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Authenticated'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public login = async (request: Request, response: Response) => {
    try {
      const user = request.user as User;
      const userByRole = user.rol === "paciente"
        ? await this.userService.getPatient(user.id)
        : await this.userService.getMedic(user.id);

      return response.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso!",
        data: userByRole,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: "Error al iniciar sesión!",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/auth/register/patient:
   *   post:
   *     summary: Registrar un nuevo paciente
   *     description: Crea una nueva cuenta de paciente con información médica
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
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Registro exitoso!"
   *                 data:
   *                   $ref: '#/components/schemas/FullPatient'
   *       400:
   *         description: Datos de entrada inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BadRequest'
   *       409:
   *         description: Existe una sesión iniciada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Authenticated'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public registerPatient = async (request: Request, response: Response) => {
    try {
      const body = request.body as RegisterPatientDto;
      body.rol = "paciente";
      const patient = await this.userService.registerUser(body);

      if (!patient) {
        throw new Error("No se registro el usuario");
      }

      return response.status(201).json({
        success: true,
        message: "Registro exitoso!",
        data: patient,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: "Ocurrió un error al registrar!",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/auth/register/medic:
   *   post:
   *     summary: Registrar un nuevo médico
   *     description: Crea una nueva cuenta de médico (solo administradores)
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
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Registro exitoso!"
   *                 data:
   *                   $ref: '#/components/schemas/FullMedic'
   *       400:
   *         description: Datos de entrada inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BadRequest'
   *       401:
   *         description: No autorizado - requiere autenticación de administrador
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Unauthorized'
   *       403:
   *         description: No permitido - requiere permiso de administrador
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Forbidden'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public registerMedic = async (request: Request, response: Response) => {
    try {
      const body = request.body as RegisterMedicDto;
      body.rol = "medico";
      const medic = await this.userService.registerUser(body);

      if (!medic) {
        throw new Error("No se registro el usuario");
      }

      return response.status(201).json({
        success: true,
        message: "Registro exitoso!",
        data: medic,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: "Ocurrió un error al registrar!",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/auth/user:
   *   get:
   *     summary: Obtener información del usuario autenticado
   *     description: Retorna la información del usuario actualmente autenticado
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
   *                   example: "Usuario encontrado!"
   *                 data:
   *                   $ref: '#/components/schemas/FullPatient'
   *       401:
   *         description: No autorizado - requiere autenticación
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Unauthorized'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public user = async (request: Request, response: Response) => {
    try {
      const user = request.user as User;
      const userByRole = user.rol == "paciente"
        ? await this.userService.getPatient(user.id)
        : await this.userService.getMedic(user.id);

      return response.status(200).json({
        success: true,
        message: "Usuario obtenido!",
        data: {
          user: userByRole,
        },
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: "Error al iniciar sesión!",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/auth/logout:
   *   post:
   *     summary: Cerrar sesión del usuario
   *     description: Termina la sesión del usuario autenticado
   *     tags: [Authentication]
   *     security:
   *       - sessionAuth: []
   *     responses:
   *       204:
   *         description: Sesión cerrada exitosamente
   *       401:
   *         description: No autorizado - requiere autenticación
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Unauthorized'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public logout = async (request: Request, response: Response) => {
    try {
      request.logout((err) => {
        request.session.destroy((err) => {
          if (err) {
            return response.status(500).json({
              success: true,
              message: "Error al cerrar sesión!",
            });
          }
          response.clearCookie("connect.sid");
          return response.status(204).json({
            success: true,
            message: "Cierre de sesión exitoso",
            data: null,
          });
        });
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: "Error al cerrar sesión!",
        data: null,
      });
    }
  };
}
