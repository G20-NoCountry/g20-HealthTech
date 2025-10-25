import { Request, Response } from "express";
import { UserService } from "../services/user.service";

/**
 * @swagger
 * tags:
 *   name: MedicalRecords
 *   description: Endpoints para obtener historiales médicos de pacientes
 */
export class MedicalRecordController {

  private userService: UserService;

  constructor() {
    this.userService = new UserService;
  }

  /**
    * @swagger
    * /api/medical_records/{patient_id}:
    *   get:
    *     summary: Obtener el historial médico de un paciente
    *     tags: [MedicalRecords]
    *     security:
    *       - sessionAuth: []
    *     parameters:
    *       - in: path
    *         name: patient_id
    *         required: true
    *         schema:
    *           type: integer
    *           minimum: 1
    *         description: ID del paciente
    *     responses:
    *       200:
    *         description: Obtención del historial médico
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
    *                   example: "Historial médico obtenido exitosamente"
    *                 data:
    *                   type: object
    *                   properties:
    *                     patient:
    *                       $ref: '#/components/schemas/FullPatient'
    *                     medical_record:
    *                       $ref: '#/components/schemas/MedicalRecordPatient'  
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
  public getMedicalRecord = async (request: Request, response: Response) => {
    try {
      const userId = parseInt(request.params.patient_id);
      const patientResource = await this.userService.getPatient(userId);
      const medicalRecord = this.generateMedicalRecord();

      return response.status(200).json({
        success: true,
        message: 'Historial medico obtenido',
        data: {
          patient: patientResource,
          medical_record: medicalRecord
        },
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: null,
        data: null,
      });
    }
  }

  private generateMedicalRecord() {
    return {
      critical_records: {
        allergies: ["polen", "frutos secos"],
      },
      personal_records: {
        surgeries: "Colecistectomía (extirpación de vesicula) a los 40 años",
        chronicle: "Hipertensión desde 2015",
        medication: "Losartan 50 mg (hipertensión)",
        habits: "fumar"
      },
      familiar_records: {
        mother: "Diabetes tipo 2",
        father: "Infarto agudo de miocardio (65 años)",
        sister: "Asma (desde la infancia)"
      }
    };
  }

}
