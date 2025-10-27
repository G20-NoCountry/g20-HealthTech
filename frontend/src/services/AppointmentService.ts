import { api } from './api';
import type { Appointment } from '../models/appointment.model';
import { mockDoctorProfiles } from './DoctorProfileService';

// Referencias a los doctores del mock
const ana = mockDoctorProfiles.find((d) => d.personal_data.full_name.includes('Ana González'))!;
const paula = mockDoctorProfiles.find((d) => d.personal_data.full_name.includes('Paula Torres'))!;

const mockAppointments: Appointment[] = [
  {
    id: 1,
    patient: { id: 101, name: 'Juan Pérez' },
    doctor: { id: 1, name: ana.personal_data.full_name },
    start_at: new Date('2025-10-28T09:00:00'),
    end_at: new Date('2025-10-28T09:30:00'),
    status: 'scheduled',
    type: 'in_person',
    location: 'Consultorio 2A',
    created_at: new Date('2025-10-01T10:00:00'),
    updated_at: new Date('2025-10-10T08:00:00'),
  },
  {
    id: 2,
    patient: { id: 102, name: 'María López' },
    doctor: { id: 2, name: paula.personal_data.full_name },
    start_at: new Date('2025-10-29T10:00:00'),
    end_at: new Date('2025-10-29T10:30:00'),
    status: 'scheduled',
    type: 'virtual',
    location: '#',
    created_at: new Date('2025-10-03T09:30:00'),
    updated_at: new Date('2025-10-03T09:30:00'),
  },
  {
    id: 3,
    patient: { id: 103, name: 'Luis Martínez' },
    doctor: { id: 1, name: ana.personal_data.full_name },
    start_at: new Date('2025-10-30T11:00:00'),
    end_at: new Date('2025-10-30T11:30:00'),
    status: 'scheduled',
    type: 'in_person',
    location: 'Consultorio 2B',
    created_at: new Date('2025-09-30T11:00:00'),
    updated_at: new Date('2025-10-27T12:00:00'),
  },
  {
    id: 4,
    patient: { id: 104, name: 'Carla Fernández' },
    doctor: { id: 2, name: paula.personal_data.full_name },
    start_at: new Date('2025-10-31T15:30:00'),
    end_at: new Date('2025-10-31T16:00:00'),
    status: 'scheduled',
    type: 'in_person',
    location: 'Consultorio 3B',
    created_at: new Date('2025-10-05T15:00:00'),
    updated_at: new Date('2025-10-18T17:00:00'),
  },
  {
    id: 5,
    patient: { id: 105, name: 'Pedro Morales' },
    doctor: { id: 1, name: ana.personal_data.full_name },
    start_at: new Date('2025-11-01T08:30:00'),
    end_at: new Date('2025-11-01T09:00:00'),
    status: 'scheduled',
    type: 'in_person',
    location: 'Consultorio 1C',
    created_at: new Date('2025-10-01T08:00:00'),
    updated_at: new Date('2025-10-29T09:00:00'),
  },
  {
    id: 6,
    patient: { id: 106, name: 'Sofía Ramírez' },
    doctor: { id: 2, name: paula.personal_data.full_name },
    start_at: new Date('2025-11-02T10:00:00'),
    end_at: new Date('2025-11-02T10:30:00'),
    status: 'scheduled',
    type: 'in_person',
    location: 'Consultorio 3A',
    created_at: new Date('2025-10-02T10:00:00'),
    updated_at: new Date('2025-10-02T10:30:00'),
  },
  {
    id: 7,
    patient: { id: 107, name: 'Daniel Ortega' },
    doctor: { id: 1, name: ana.personal_data.full_name },
    start_at: new Date('2025-11-03T09:30:00'),
    end_at: new Date('2025-11-03T10:00:00'),
    status: 'scheduled',
    type: 'virtual',
    location: '#',
    created_at: new Date('2025-10-05T09:00:00'),
    updated_at: new Date('2025-10-05T09:30:00'),
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

  // Obtener citas del médico logueado
  async getAppointmentsForMedic(): Promise<Appointment[]> {
    const res = await api.get('/medic/appointments');
    return res.data;
  },

  // Obtener citas del paciente logueado
  async getAppointmentsForPatient(): Promise<Appointment[]> {
    const res = await api.get('/paciente/appointments');
    return res.data;
  },

  // Crear nueva cita
  async createAppointment(data: {
    medic_id: number;
    start_at: string; // formato ISO
    end_at: string;
    type: 'in_person' | 'virtual';
    location?: string;
  }): Promise<Appointment> {
    const res = await api.post('/paciente/appointments', data);
    return res.data;
  },

  // Actualizar cita
  async updateAppointment(
    medic_id: number,
    id_cita: number,
    data: Partial<Appointment>,
  ): Promise<Appointment> {
    const res = await api.put(`/paciente/appointments/${medic_id}/${id_cita}`, data);
    return res.data;
  },

  // Cancelar cita
  async cancelAppointment(medic_id: number, id_cita: number): Promise<void> {
    await api.delete(`/paciente/appointments/${medic_id}/${id_cita}`);
  },
};
