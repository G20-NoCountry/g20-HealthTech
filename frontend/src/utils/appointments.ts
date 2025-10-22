import type { AppointmentStatus } from '../services/AppointmentService';

export function isAppointmentEditable(status: AppointmentStatus): boolean {
  return status === 'scheduled' || status === 'confirmed';
}
