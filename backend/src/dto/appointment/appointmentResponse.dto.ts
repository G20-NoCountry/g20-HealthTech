export interface AppointmentResponseDto {
  id: number;
  patient_id: number;
  medic_id: number;
  start_at: Date;
  symptoms?: string;
  diagnostic?: string;
  type: "in_person" | "virtual";
  location?: string;
  created_at: Date;
  updated_at: Date;
}
