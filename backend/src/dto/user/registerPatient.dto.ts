export class RegisterPatientDto {
    constructor(
        public patient_id: number,
        public id_health_insurance: number,
        public location: string,
    ) { }

}