import type { AppointmentStatus } from '../../api/models/appointment.interface';

export function isAppointmentScheduled(status: AppointmentStatus): boolean {
  return status === 'scheduled' || status === 'confirmed';
}
