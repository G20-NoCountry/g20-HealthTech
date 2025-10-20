import { RegisterUserDto } from "./registerUser.dto";

export class RegisterPatientDto extends RegisterUserDto {
    constructor(
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        role_id: number,
        phone: string,
        public patient_id: number,
        public id_health_insurance: number,
        public location: string,
    ) {
        super(first_name, last_name, email, password, role_id, phone);
    }

}