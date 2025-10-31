import type { AppointmentStatus } from '../../api/models/appointment.interface';

export function isAppointmentScheduled(status: AppointmentStatus): boolean {
  return status === 'scheduled' || status === 'confirmed';
}

export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes; // Convierte la hora a minutos
};

export const isTimeSlotOccupied = (time: string, occupiedTimes: string[]) => {
  const timeInMinutes = timeToMinutes(time); // Convertir el tiempo de la franja seleccionada a minutos

  // Iterar sobre las citas ocupadas
  for (const occupiedTime of occupiedTimes) {
    const [start, end] = occupiedTime.split('-').map(timeToMinutes); // Convertir las franjas ocupadas a minutos

    // Verificar si el tiempo está dentro del intervalo de ocupación
    if (timeInMinutes >= start && timeInMinutes < end) {
      return true; // Si el horario está ocupado, devolver true
    }
  }

  return false; // Si no se solapan, devolver false
};

export const convertToLocalTime = (utcDate: Date) => {
  const localDate = new Date(utcDate);
  const offset = localDate.getTimezoneOffset(); // Obtener el desplazamiento de la zona horaria local (en minutos)
  localDate.setMinutes(localDate.getMinutes() - offset); // Ajustar la fecha a la zona horaria local
  return localDate;
};
