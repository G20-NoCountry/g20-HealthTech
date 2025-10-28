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
