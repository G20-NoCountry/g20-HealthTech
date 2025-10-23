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
};

export const todayAppointments: Appointment[] = [
  { id: 1, time: '10:30 AM', patientName: 'Carlos Ramirez', type: 'Presencial', status: 'Finalizada' },
  { id: 2, time: '11:00 AM', patientName: 'Ana Martinez', type: 'Virtual', status: 'Pendiente' },
  { id: 3, time: '11:30 AM', patientName: 'Facundo Veliz', type: 'Presencial', status: 'Pendiente' },
  { id: 3, time: '11:30 AM', patientName: 'Facundo Veliz', type: 'Presencial', status: 'Finalizada' },
  { id: 3, time: '11:30 AM', patientName: 'Facundo Veliz', type: 'Virtual', status: 'Pendiente' },
  { id: 3, time: '11:30 AM', patientName: 'Facundo Veliz', type: 'Presencial', status: 'Pendiente' },
  { id: 3, time: '11:30 AM', patientName: 'Facundo Veliz', type: 'Virtual', status: 'Pendiente' },

];

export const stats = [
  { id: 1, icon: 'pi pi-users', value: 24, label: 'Pacientes esta semana' },
  { id: 2, icon: 'pi pi-calendar', value: 8, label: 'Citas hoy' },
  { id: 3, icon: 'pi pi-video', value: 12, label: 'Videollamadas realizadas' },
];