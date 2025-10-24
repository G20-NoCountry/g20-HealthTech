import { hashSync } from "bcrypt";
import { RegisterMedicDto } from "../dto/user/registerMedic.dto";
import { RegisterPatientDto } from "../dto/user/registerPatient.dto";
import { RegisterUserDto } from "../dto/user/registerUser.dto";
import { Medic, Patient, User } from "../models";

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
}
