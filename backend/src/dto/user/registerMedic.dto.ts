import { Specialities } from "../../types";

export class RegisterMedicDto {
    constructor(
        public medic_id: number,
        public speciality: Specialities,
        public license_num: number,
        public schedule_from: Date,
        public schedule_to: Date
    ) { }

}