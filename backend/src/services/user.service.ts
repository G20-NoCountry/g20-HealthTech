import { RegisterMedicDto } from "../dto/user/registerMedic.dto";
import { RegisterPatientDto } from "../dto/user/registerPatient.dto";
import { MedicData, PatientData, RegisterUserDto } from "../dto/user/registerUser.dto";
import { Medic, Patient, Role, User } from "../models";

export class UserService {

    public async registerUser(dto: RegisterUserDto) {
        try {
            const newUser = this.createUser(dto);
            await newUser.save();
            const role = await Role.findOne({ where: { id: dto.role_id } });
            if (role) {
                const newUserByRole = this.createUserByRole(newUser.id, role.rol, dto.data);
                if (!newUserByRole) {
                    throw new Error("error de registro");
                }
                return newUserByRole;
            }
            return newUser;
        } catch (error: any) {
            return null;
        }
    }

    private createUserByRole(userId: number, rolName: string, data: PatientData | MedicData) {
        if (rolName == "patient") {
            const patientData = data as PatientData;
            const newPatient = this.createPatient(new RegisterPatientDto(
                userId,
                patientData.id_health_insurance,
                patientData.location
            ));
            return newPatient;
        }

        const medicData = data as MedicData;
        const newMedic = this.createMedic(new RegisterMedicDto(
            userId,
            medicData.speciality,
            medicData.license_num,
            medicData.schedule_from,
            medicData.schedule_to,
        ));
        return newMedic;
    }

    private createUser(dto: RegisterUserDto): User {
        const user: User = User.build({
            first_name: dto.first_name,
            last_name: dto.last_name,
            email: dto.email,
            password: dto.password,
            role_id: dto.role_id,
            phone: dto.phone ?? null,
        });
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

}
