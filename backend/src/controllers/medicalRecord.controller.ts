import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class MedicalRecordController {

  private userService: UserService;

  constructor() {
    this.userService = new UserService;
  }

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
