import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UpdateMedicDto } from "../dto/medic/updateMedic.dto";
import { UpdatePatientDto } from "../dto/patient/updatePatient.dto";

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService;
    }

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
            const patient = await this.userService.getPatient(id);
            if (!patient) {
                return response.status(404).json({
                    success: false,
                    message: 'No hubo coincidencias',
                });
            }
            return response.status(200).json({
                success: true,
                message: 'Obtenido con exito!',
                data: patient,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "Hubo un error al obtener el paciente",
                data: null,
            });
        }
    }

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
                message: 'Obtenido con exito!',
                data: medic,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "",
                data: null,
            });
        }
    }

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
        try {
            const userId = parseInt(request.params.id);
            const body = request.body as UpdateMedicDto;
            body.id = userId;
            const medicUpdated = await this.userService.editUser(body);

            if (!medicUpdated) {
                throw new Error("No se pudo actualizar el usuario");
            }

            return response.status(200).json({
                success: true,
                message: 'Actualizado correctamente!',
                data: medicUpdated,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "",
                data: null,
            });
        }
    }

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
            const userId = parseInt(request.params.id);
            const body = request.body as UpdatePatientDto;
            body.id = userId;
            const patientUpdated = await this.userService.editUser(body);

            if (!patientUpdated) {
                throw new Error("No se pudo actualizar el usuario");
            }

            return response.status(200).json({
                success: true,
                message: 'Actualizado correctamente!',
                data: patientUpdated,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "",
                data: null,
            });
        }
    }

}
