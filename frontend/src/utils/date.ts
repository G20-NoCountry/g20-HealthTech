export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDateTime(iso: string) {
  const date = new Date(iso);
  return {
    date: date.toLocaleDateString('es-ES'),
    time: date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

export function canJoinVirtualAppointment(startAt: string, endAt: string): boolean {
  const now = new Date();
  const start = new Date(startAt);
  const end = new Date(endAt);

  const isToday = isSameDay(start, now);

  const fiveMinutesBefore = new Date(start.getTime() - 5 * 60 * 1000);

  return isToday && now >= fiveMinutesBefore && now <= end;
}
