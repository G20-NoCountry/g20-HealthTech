import { Medic, User } from "../../models";

export class MedicResource {
    static toResponse(user: User, medic: Medic) {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            rol: user.rol,
            phone: user.phone,
            is_active: user.is_active,
            specialty: medic.specialty,
            licence_num: medic.licence_num,
            schedule_from: medic.schedule_from,
            schedule_at: medic.schedule_at
        };
    }
}
