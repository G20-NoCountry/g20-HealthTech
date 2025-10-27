import { CreateAppointmentDto } from "./createAppointment.dto";

export interface UpdateAppointmentDto extends Partial<CreateAppointmentDto> {
  id: number;
  patient_id: number;
  medic_id: number;
}
