import type { Appointment } from './AppointmentListItem';

export const doctorInfo = {
  name: 'Dra. Ana García',
  specialty: 'Cardiología',
  notifications: 2,
};

export const nextAppointment = {
  patientName: 'Susana Ramirez',
  reason: 'Control rutinario',
  time: '9:00 AM',
  isToday: true,
  patientId: 'p008',
};

export const todayAppointments: Appointment[] = [
  { id: 1, time: '10:30 AM', patientName: 'Carlos Ramirez', type: 'Presencial', status: 'Finalizada', patientId: 'p001' },
  { id: 2, time: '11:00 AM', patientName: 'Ana Martinez', type: 'Virtual', status: 'Pendiente', patientId: 'p002' },
  { id: 3, time: '11:30 AM', patientName: 'Facundo Veliz', type: 'Presencial', status: 'Pendiente', patientId: 'p003' },
  { id: 4, time: '12:00 PM', patientName: 'Sofia Gomez', type: 'Presencial', status: 'Finalizada', patientId: 'p004' },
  { id: 5, time: '12:30 PM', patientName: 'Luis Castro', type: 'Virtual', status: 'Pendiente', patientId: 'p005' },
  { id: 6, time: '1:00 PM', patientName: 'Marta Diaz', type: 'Presencial', status: 'Pendiente', patientId: 'p006' },
  { id: 7, time: '1:30 PM', patientName: 'Jorge Núñez', type: 'Virtual', status: 'Pendiente', patientId: 'p007' },
];

export const stats = [
  { id: 1, icon: 'pi pi-users', value: 24, label: 'Pacientes esta semana' },
  { id: 2, icon: 'pi pi-calendar', value: 8, label: 'Citas hoy' },
  { id: 3, icon: 'pi pi-video', value: 12, label: 'Videollamadas realizadas' },
];