import { hashSync } from "bcrypt";
import { Specialities } from "../../types";

export interface PatientData {
    id_health_insurance: number,
    location: string,
}
export interface MedicData {
    speciality: Specialities,
    license_num: number,
    schedule_from: Date,
    schedule_to: Date
}

export class RegisterUserDto {

    public password: string;

    constructor(
        public first_name: string,
        public last_name: string,
        public email: string,
        password: string,
        public role_id: number,
        public phone: string,
        public data: PatientData | MedicData,
    ) {
        this.password = hashSync(password, 10);
    }

}