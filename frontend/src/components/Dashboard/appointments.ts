import type { AppointmentStatus } from '../../models/appointment.model';

export function isAppointmentEditable(status: AppointmentStatus): boolean {
  return status === 'scheduled' || status === 'confirmed';
}
