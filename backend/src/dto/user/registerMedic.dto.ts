import { Specialities } from "../../types";
import { RegisterUserDto } from "./registerUser.dto";

export class RegisterMedicDto extends RegisterUserDto {
    constructor(
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        role_id: number,
        phone: string,
        public medic_id: number,
        public speciality: Specialities,
        public license_num: number,
        public schedule_from: Date,
        public schedule_to: Date
    ) {
        super(first_name, last_name, email, password, role_id, phone);
    }

}