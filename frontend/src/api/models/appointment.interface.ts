export interface Appointment {
  id?: number;
  patient_id: number;
  medic_id: number;
  start_at: string;
  end_at: string;
  type: AppointmentType;
  symptoms?: string;
  diagnostic?: string;
  location?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type AppointmentType = "in_person" | "virtual";