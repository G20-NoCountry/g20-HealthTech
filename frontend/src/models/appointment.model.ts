export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export type AppointmentType = 'in_person' | 'virtual';

export interface Appointment {
  id: number;
  patient: { id: number; name: string };
  doctor: { id: string; name: string };
  start_at: string; // ISO date string
  end_at: string;
  status: AppointmentStatus;
  type: AppointmentType;
  location?: string;
  created_at: string;
  updated_at: string;
}
