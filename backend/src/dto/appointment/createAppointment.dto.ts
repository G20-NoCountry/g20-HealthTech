export interface CreateAppointmentDto {
  patient_id?: number;
  medic_id?: number;
  start_at: string;
  end_at: string;
  type: "in_person" | "virtual";
  location?: string;
  symptoms?: string;
}
