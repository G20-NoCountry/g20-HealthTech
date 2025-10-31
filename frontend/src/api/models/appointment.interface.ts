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
  status?: AppointmentStatus;
  created_at?: Date;
  updated_at?: Date;
}

export interface AppointmentWithUsers extends Appointment {
  doctor: {
    id: number;
    name: string;
  };
  patient: {
    id: number;
    name: string;
  };
}

export type AppointmentType = 'in_person' | 'virtual';

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export const availableTimes = [
  '09:00',
  '09:15',
  '09:30',
  '09:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
];
