import { hashSync } from "bcrypt";
import { RegisterMedicDto } from "../dto/user/registerMedic.dto";
import { RegisterPatientDto } from "../dto/user/registerPatient.dto";
import { RegisterUserDto } from "../dto/user/registerUser.dto";
import { Medic, Patient, Role, User } from "../models";

export class UserService {

    public async registerUser(dto: RegisterPatientDto | RegisterMedicDto) {
        try {
            const newUser = await this.createUser(dto);
            if (newUser) {
                const role = await Role.findOne({ where: { id: dto.role_id } });
                if (role) {
                    const newUserByRole = this.createUserByRole(newUser.id, dto);
                    if (!newUserByRole) {
                        throw new Error("Error en registro");
                    }
                    return newUserByRole;
                }
            }
            return newUser;
        } catch (error: any) {
            return null;
        }
    }

    private createUserByRole(userId: number, dto: RegisterMedicDto | RegisterPatientDto) {
        if ("id_health_insurance" in dto) {
            dto.patient_id = userId;
            const newPatient = this.createPatient(dto);
            return newPatient;
        }
        dto.medic_id = userId;
        const newMedic = this.createMedic(dto);
        return newMedic;
    }

    private async createUser(dto: RegisterUserDto) {
        dto.password = hashSync(dto.password, 10);
        const user: User = User.build({
            first_name: dto.first_name,
            last_name: dto.last_name,
            email: dto.email,
            password: dto.password,
            role_id: dto.role_id,
            phone: dto.phone ?? null,
        });
        await user.save();
        return user;
    }

    private createPatient(dto: RegisterPatientDto) {
        const patient = Patient.build({
            id: dto.patient_id,
            id_health_insurance: dto.id_health_insurance,
            location: dto.location,
        });
        patient.save();
        return patient;
    }

    private createMedic(dto: RegisterMedicDto) {
        const medic = Medic.build({
            id: dto.medic_id,
            speciality: dto.speciality,
            license_num: dto.license_num,
            schedule_from: dto.schedule_from,
            schedule_to: dto.schedule_to,
        });
        medic.save();
        return medic;
    }

    public async getPatient(id: number) {
        try {
            const patient = Patient.findOne({ where: { id: id } });
            if (!patient) {
                throw new Error("No se encontro");
            }
            return patient;
        } catch (error: any) {
            return null;
        }
    }

    public async getMedic(id: number) {
        try {
            const medic = Medic.findOne({ where: { id: id } });
            if (!medic) {
                throw new Error("No se encontro");
            }
            return medic;
        } catch (error: any) {
            return null;
        }
    }

}
