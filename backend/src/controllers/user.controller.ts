import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UpdateMedicDto } from "../dto/medic/updateMedic.dto";
import { UpdatePatientDto } from "../dto/patient/updatePatient.dto";
import { Medic, Patient, User } from "../models";
import { PatientResource } from "../resources/patient/patientResource.resource";
import { MedicResource } from "../resources/medic/medicResource.resource";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * @swagger
   * /api/medics:
   *   get:
   *     summary: Listar todos los médicos (resumen)
   *     tags: [Users]
   *     security:
   *       - sessionAuth: []
   *     responses:
   *       200:
   *         description: Lista de médicos obtenida correctamente
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
   *                   example: "Obtenidos con exito!"
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       medic_id:
   *                         type: string
   *                         example: "12"
   *                       speciality:
   *                         type: string
   *                         example: "oftamologia"
   *       401:
   *         description: No autenticado
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
  public getMedicsSummary = async (request: Request, response: Response) => {
    try {
      const medics = await this.userService.obtainMedicsSummary();
      return response.status(200).json({
        success: true,
        message: "Obtenidos con exito!",
        data: medics,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: "Hubo un error al obtener los medicos",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/patients/{id}:
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
   *         description: ID del paciente
   *     responses:
   *       200:
   *         description: Obtención del paciente
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
   *                   example: "Paciente obtenido exitosamente"
   *                 data:
   *                     $ref: '#/components/schemas/FullPatient'
   *       401:
   *         description: No autenticado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Unauthorized'
   *       403:
   *         description: No permitido
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
  public getPatient = async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);
      const user = request.user as User;

      // Si eres medico, puedes acceder a cualquier paciente, pero si eres paciente, solamente a tu propio recurso
      if (!user || (user.rol === "paciente" && id !== user.id))
        throw new Error("No tienes permisos para ver este paciente");

      const patient = await this.userService.getPatient(id);
      if (!patient) {
        return response.status(404).json({
          success: false,
          message: "No hubo coincidencias",
        });
      }
      return response.status(200).json({
        success: true,
        message: "Obtenido con exito!",
        data: patient,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: "Hubo un error al obtener el paciente",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/medics/{id}:
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
   *         description: Obtención del paciente
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
   *                   example: "Medico obtenido exitosamente"
   *                 data:
   *                   $ref: '#/components/schemas/FullMedic'
   *       401:
   *         description: No autenticado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Unauthorized'
   *       403:
   *         description: No permitido
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
  public getMedic = async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);

      const medic = await this.userService.getMedic(id);
      if (!medic) {
        return response.status(404).json({
          success: false,
          message: "No hubo coincidencias",
        });
      }
      return response.status(200).json({
        success: true,
        message: "Obtenido con exito!",
        data: medic,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: "",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/medics/{id}:
   *   patch:
   *     summary: Actualizar un medico
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
   *         description: Medico actualizado
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
   *                   example: "Medico actualizado exitosamente"
   *                 data:
   *                   $ref: '#/components/schemas/FullMedic'
   *       401:
   *         description: No autenticado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Unauthorized'
   *       403:
   *         description: No permitido
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
  public updateMedic = async (request: Request, response: Response) => {
    // Arreglo de controlador y aplicado de restricciones de autorización necesarias
    try {
      const authUser = request.user as User | undefined;

      if (!authUser) {
        return response.status(401).json({
          success: false,
          message: "No autenticado",
          data: null,
        });
      }

      if (authUser.rol !== "medico") {
        return response.status(403).json({
          success: false,
          message: "No tienes permisos para actualizar este medico",
          data: null,
        });
      }

      const body = request.body as UpdateMedicDto;
      body.id = authUser.id;
      const medicUpdated = await this.userService.editUser(body, "medico");
      const userUpdated = await User.findByPk(body.id);
      const medic = await Medic.findByPk(body.id);

      if (!userUpdated || !medicUpdated || !medic) {
        throw new Error("No se pudo actualizar el usuario");
      }

      const medicResource = MedicResource.toResponse(userUpdated, medic);

      return response.status(200).json({
        success: true,
        message: "Actualizado correctamente!",
        data: medicResource,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message || "Hubo un error al actualizar el medico",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/patients/{id}:
   *   patch:
   *     summary: Actualizar un paciente
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
   *         description: ID del paciente
   *     responses:
   *       200:
   *         description: Paciente actualizado
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
   *                   example: "Paciente actualizado exitosamente"
   *                 data:
   *                   $ref: '#/components/schemas/FullPatient'
   *       401:
   *         description: No autenticado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Unauthorized'
   *       403:
   *         description: No permitido
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
  public updatePatient = async (request: Request, response: Response) => {
    try {
      // Arreglo de controlador y aplicado de restricciones de autorización necesarias
      const authUser = request.user as User | undefined;

      if (!authUser) {
        return response.status(401).json({
          success: false,
          message: "No autenticado",
          data: null,
        });
      }

      if (authUser.rol !== "paciente") {
        return response.status(403).json({
          success: false,
          message: "No tienes permisos para actualizar este paciente",
          data: null,
        });
      }

      const body = request.body as UpdatePatientDto;
      body.id = authUser.id;
      const patientUpdated = await this.userService.editUser(body, "paciente");

      const userUpdated = await User.findByPk(body.id);
      const patient = await Patient.findByPk(body.id);

      if (!userUpdated || !patientUpdated || !patient) {
        throw new Error("No se pudo actualizar el usuario");
      }

      const patientResource = PatientResource.toResponse(userUpdated, patient)

      return response.status(200).json({
        success: true,
        message: "Actualizado correctamente!",
        data: patientResource,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: "",
        data: null,
      });
    }
  };
}
