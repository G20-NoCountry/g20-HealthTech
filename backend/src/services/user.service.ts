import { hashSync } from "bcrypt";
import { RegisterMedicDto } from "../dto/user/registerMedic.dto";
import { RegisterPatientDto } from "../dto/user/registerPatient.dto";
import { RegisterUserDto } from "../dto/user/registerUser.dto";
import { Medic, Patient, User } from "../models";
import { UpdateMedicDto } from "../dto/medic/updateMedic.dto";
import { UpdatePatientDto } from "../dto/patient/updatePatient.dto";
import { UpdateUserDto } from "../dto/user/updateUser.dto";
import { PatientResource } from "../resources/patient/patientResource.resource";
import { MedicResource } from "../resources/medic/medicResource.resource";

export class UserService {
  public async registerUser(dto: RegisterPatientDto | RegisterMedicDto) {
    try {
      const newUser = await this.createUser(dto);
      if (newUser) {
        const newUserByRole = this.createUserByRole(newUser.id, dto);
        if (!newUserByRole) {
          throw new Error("Error en registro");
        }
        return newUserByRole;
      }
      return newUser;
    } catch (error: any) {
      return null;
    }
  }

  private createUserByRole(
    userId: number,
    dto: RegisterMedicDto | RegisterPatientDto
  ) {
    if ("health_insurance" in dto) {
      const newPatient = this.createPatient(userId, dto);
      return newPatient;
    }
    const newMedic = this.createMedic(userId, dto);
    return newMedic;
  }

  private async createUser(dto: RegisterUserDto) {
    dto.password = hashSync(dto.password, 10);
    const user: User = User.build({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      password: dto.password,
      rol: dto.rol,
      phone: dto.phone ?? null,
    });
    await user.save();
    return user;
  }

  private createPatient(userId: number, dto: RegisterPatientDto) {
    const patient = Patient.build({
      id: userId,
      health_insurance: dto.health_insurance,
      blood_type: dto.blood_type,
      alergias: dto.alergias,
      cronicas_condition: dto.cronicas_condition,
      actual_medication: dto.actual_medication,
      location: dto.location,
    });
    patient.save();
    return patient;
  }

  private createMedic(userId: number, dto: RegisterMedicDto) {
    const medic = Medic.build({
      id: userId,
      specialty: dto.specialty,
      licence_num: dto.licence_num,
      schedule_from: dto.schedule_from,
      schedule_at: dto.schedule_at,
    });
    medic.save();
    return medic;
  }

  public async getPatient(id: number) {
    try {
      const user = await User.findOne({ where: { id: id } });
      const patient = await Patient.findOne({ where: { id: id } });
      if (!user || !patient) {
        throw new Error("No se encontro");
      }
      const patientResource = PatientResource.toResponse(user, patient);
      return patientResource;
    } catch (error: any) {
      return null;
    }
  }

  public async getMedic(id: number) {
    try {
      const user = await User.findOne({ where: { id: id } });
      const medic = await Medic.findOne({ where: { id: id } });
      if (!user || !medic) {
        throw new Error("No se encontro");
      }
      const medicResource = MedicResource.toResponse(user, medic);
      return medicResource;
    } catch (error: any) {
      return null;
    }
  }

  public async editUser(dto: UpdatePatientDto | UpdateMedicDto) {
    try {
      if (!await this.updateUser(dto)) {
        throw new Error("Error en actualizacion");
      }
      const userByRole = await this.updateUserByRole(dto);
      if (!userByRole) {
        throw new Error("Error en actualizacion");
      }
      return userByRole;
    } catch (error: any) {
      return null;
    }
  }

  private async updateUserByRole(dto: UpdateUserDto) {
    if ("licence_num" in dto) {
      if (!await this.updateMedic(dto as UpdateMedicDto)) {
        throw new Error("No se pudo actualizar el medico");
      }
      const medicUpdated = this.getMedic(dto.id);
      return medicUpdated;
    }
    if (! await this.updatePatient(dto as UpdatePatientDto)) {
      throw new Error("No se pudo actualizar el paciente");
    }
    const patientUpdated = this.getPatient(dto.id);
    return patientUpdated;
  }

  private async updateUser(dto: UpdateUserDto) {
    const rows = await User.update({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      phone: dto.phone,
    }, { where: { id: dto.id } });
    return rows.length > 0;
  }

  private async updatePatient(dto: UpdatePatientDto) {
    const rows = await Patient.update({
      id_health_insurance: dto.id_health_insurance,
      blood_type: dto.blood_type,
      alergias: dto.alergias,
      cronicas_condition: dto.cronicas_condition,
      actual_medication: dto.actual_medication,
      location: dto.location,
    }, { where: { id: dto.id } });
    return rows.length > 0;
  }

  private async updateMedic(dto: UpdateMedicDto) {
    const rows = await Medic.update({
      licence_num: dto.licence_num,
    }, { where: { id: dto.id } });
    return rows.length > 0;
  }

}
