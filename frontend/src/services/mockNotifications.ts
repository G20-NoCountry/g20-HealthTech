import type { Notification } from '../components/Notifications/NotificationBell';

export const doctorNotifications: Notification[] = [
  { id: 1, message: '¡Tu cita con la Dra. Ana García está por comenzar!', read: false, timestamp: 'Hace 5m' },
  { id: 2, message: 'El paciente Carlos Ramirez ha cancelado su turno.', read: false, timestamp: 'Hace 2h' },
  { id: 3, message: 'Nuevos resultados de laboratorio disponibles para Susana.', read: true, timestamp: 'Ayer' },
];

export const patientNotifications: Notification[] = [
  { id: 1, message: '¡Tus resultados de laboratorio ya están listos!', read: false, timestamp: 'Hace 15m' },
  { id: 2, message: 'Recordatorio: Tienes una cita mañana a las 10:00 AM.', read: true, timestamp: 'Hace 8h' },
];

