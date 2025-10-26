import type { Appointment } from '../models/appointment.model';

const mockAppointments: Appointment[] = [
  {
    id: 1,
    patient: { id: 101, name: 'Juan Pérez' },
    doctor: { id: 'ana-gonzalez', name: 'Dra. Ana González' },
    start_at: '2025-10-25T19:11:00',
    end_at: '2025-10-25T19:30:00',
    status: 'confirmed',
    type: 'virtual',
    location: 'Consultorio 2A',
    created_at: '2025-10-01T10:00:00',
    updated_at: '2025-10-10T08:00:00',
  },
  {
    id: 2,
    patient: { id: 102, name: 'María López' },
    doctor: { id: 'carlos-ruiz', name: 'Dr. Carlos Ruiz' },
    start_at: '2025-10-28T14:00:00',
    end_at: '2025-10-28T14:20:00',
    status: 'scheduled',
    type: 'in_person',
    location: '#',
    created_at: '2025-10-03T09:30:00',
    updated_at: '2025-10-03T09:30:00',
  },
  {
    id: 3,
    patient: { id: 103, name: 'Luis Martínez' },
    doctor: { id: 'luis-mendoza', name: 'Dr. Luis Mendoza' },
    start_at: '2025-10-27T11:00:00',
    end_at: '2025-10-27T11:30:00',
    status: 'completed',
    type: 'in_person',
    location: 'Consultorio 1C',
    created_at: '2025-09-30T11:00:00',
    updated_at: '2025-10-27T12:00:00',
  },
  {
    id: 4,
    patient: { id: 104, name: 'Carla Fernández' },
    doctor: { id: 'paula-torres', name: 'Dra. Paula Torres' },
    start_at: '2025-10-27T10:00:00',
    end_at: '2025-10-27T10:30:00',
    status: 'cancelled',
    type: 'in_person',
    location: 'Consultorio 3B',
    created_at: '2025-10-05T15:00:00',
    updated_at: '2025-10-18T17:00:00',
  },
  {
    id: 5,
    patient: { id: 105, name: 'Pedro Morales' },
    doctor: { id: 'julius-hibbert', name: 'Dr. Julius Hibbert' },
    start_at: '2025-10-29T08:00:00',
    end_at: '2025-10-29T08:30:00',
    status: 'no_show',
    type: 'virtual',
    location: '#',
    created_at: '2025-10-01T08:00:00',
    updated_at: '2025-10-29T09:00:00',
  },
  {
    id: 7,
    patient: { id: 104, name: 'Carla Fernández' },
    doctor: { id: 'paula-torres', name: 'Dra. Paula Torres' },
    start_at: '2025-10-27T10:00:00',
    end_at: '2025-10-27T10:30:00',
    status: 'scheduled',
    type: 'in_person',
    location: 'Consultorio 3B',
    created_at: '2025-10-05T15:00:00',
    updated_at: '2025-10-18T17:00:00',
  },
  {
    id: 8,
    patient: { id: 105, name: 'Pedro Morales' },
    doctor: { id: 'julius-hibbert', name: 'Dr. Julius Hibbert' },
    start_at: '2025-10-29T08:00:00',
    end_at: '2025-10-29T08:30:00',
    status: 'scheduled',
    type: 'virtual',
    location: '#',
    created_at: '2025-10-01T08:00:00',
    updated_at: '2025-10-29T09:00:00',
  },
];

export const AppointmentsService = {
  getAppointments(): Promise<Appointment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAppointments);
      }, 500);
    });
  },
};
