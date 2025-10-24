export interface UpdateAppointmentDto {
  start_at?: string;
  end_at?: string;
  type?: "in_person" | "virtual";
  location?: string;
  symptoms?: string;
  diagnostic?: string;
}
