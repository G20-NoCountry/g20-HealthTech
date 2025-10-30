export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDateTime(date: Date) {
  return {
    date: date.toLocaleDateString('es-ES'),
    time: date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

export function canJoinVirtualAppointment(startAt: Date, endAt: Date): boolean {
  const now = new Date();
  const isToday = isSameDay(startAt, now);
  const fiveMinutesBefore = new Date(startAt.getTime() - 5 * 60 * 1000);

  return isToday && now >= fiveMinutesBefore && now <= endAt;
}

// Validación del formulario (Fecha válida, Contraseña con reglas)
export const isValidDate = (dateString: string): boolean => {
  const parts = dateString.split('/');
  if (parts.length !== 3) return false;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};
