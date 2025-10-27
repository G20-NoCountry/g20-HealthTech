export interface CreateAppointmentDto {
  patient_id: number;
  medic_id: number;
  start_at: string;
  end_at?: string; // Opcional, se calcula automáticamente como start_at + 30 minutos
  type: "in_person" | "virtual";
  location?: string;
  symptoms: string; // Requerido: el paciente debe describir sus síntomas
  diagnostic?: string; // Opcional: solo lo agrega el médico durante o después de la consulta
}
