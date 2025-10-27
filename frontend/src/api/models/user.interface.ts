import type { Medic } from "./medic.interface";
import type { Patient } from "./patient.interface";

export interface User {
    id?: number;
    rol: "medico" | "paciente";
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    password?: string;
    is_active?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface PatientUser extends Omit<User, "rol">, Patient { }
export interface MedicUser extends Omit<User, "rol">, Medic { }