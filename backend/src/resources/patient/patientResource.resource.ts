import { Patient, User } from "../../models";

export class PatientResource {
    static toResponse(user: User, patient: Patient) {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            rol: user.rol,
            phone: user.phone,
            is_active: user.is_active,
            id_health_insurance: patient.id_health_insurance,
            blood_type: patient.blood_type,
            alergias: patient.alergias,
            cronicas_condition: patient.cronicas_condition,
            actual_medication: patient.actual_medication,
            location: patient.location
        };
    }
}
