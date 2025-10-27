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
      if (!newUser) {
        throw new Error("Error en registro");
      }
      const newUserByRole = this.createUserByRole(newUser.id, dto);
      if (!newUserByRole) {
        throw new Error("Error en registro");
      }
      return newUser.rol == "paciente"
        ? PatientResource.toResponse(newUser, newUserByRole as Patient)
        : MedicResource.toResponse(newUser, newUserByRole as Medic);
    } catch (error: any) {
      return null;
    }
  }

  public async obtainMedicsSummary() {
    try {
      const medics = await Medic.findAll({ attributes: ["id", "speciality"] });
      const ids = medics.map((m) => Number(m.get("id")));

      const users = await User.findAll({
      where: { id: ids },
      attributes: ["id", "first_name", "last_name"],
      });

      const usersById = new Map<number, { first_name: string; last_name: string }>();
      users.forEach((u) =>
      usersById.set(Number(u.get("id")), {
        first_name: String(u.get("first_name")),
        last_name: String(u.get("last_name")),
      })
      );

      return medics.map((m) => {
      const id = Number(m.get("id"));
      const user = usersById.get(id);
      return {
        medic_id: String(id),
        speciality: String(m.get("speciality")),
        first_name: user?.first_name ?? "",
        last_name: user?.last_name ?? "",
      };
      });
    } catch (error) {
      return [] as { medic_id: string; speciality: string; first_name: string; last_name: string }[];
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
      speciality: dto.specialty,
      license_num: dto.licence_num,
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

  //$ [FIX] Refactorización de método editUser para actualizar tanto pacientes como médicos
  public async editUser(dto: UpdatePatientDto | UpdateMedicDto, rol: "paciente" | "medico") {

    const userUpdated = await this.updateUser(dto);
    if (!userUpdated) {
      throw new Error("No se pudo actualizar el usuario");
    }
    if (rol === "paciente") {
      const patientUpdated = await this.updatePatient(dto as UpdatePatientDto);
      if (!patientUpdated) {
        throw new Error("No se pudo actualizar el paciente");
      }
    } else {
      const medicUpdated = await this.updateMedic(dto as UpdateMedicDto);
      if (!medicUpdated) {
        throw new Error("No se pudo actualizar el medico");
      }
    }
    return dto;
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
      health_insurance: dto.health_insurance,
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
      license_num: dto.licence_num,
    }, { where: { id: dto.id } });
    return rows.length > 0;
  }

}
