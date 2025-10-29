import { useState, useEffect } from 'react';
import { api } from '../api';
import type { Appointment } from '../components/DasboardMedico/AppointmentListItem';
import type { PatientUser } from '../api/models/user.interface';
import type { NextAppointment } from '../components/DasboardMedico/NextAppointmentCard';

interface ApiAppointmentData {
  id: number;
  patient_id: number;
  medic_id: number;
  start_at: string;
  end_at: string;
  symptoms: string | null;
  diagnostic: string | null;
  type: 'in_person' | 'virtual';
  location: string | null;
  created_at: string;
  updated_at: string;
}

interface TransformedAppointment {
  id: number;
  time: string;
  patientName: string;
  type: 'Presencial' | 'Virtual';
  status: 'Finalizada' | 'Pendiente';
  patientId: string;
  startDate: Date;
}

export const useMedicAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        console.log('[useMedicAppointments] Iniciando búsqueda de citas');
        console.log('[useMedicAppointments] URL base:', import.meta.env.VITE_API || 'http://localhost:3000/api');
        
        // Obtener citas del médico
        const response = await api.appointments.searchAppointmentsAsMedic({});
        console.log('[useMedicAppointments] Respuesta del servidor:', {
          success: response.success,
          message: response.message,
          dataLength: response.data?.length
        });
        
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Error al obtener las citas');
        }

        const appointmentsData = response.data as unknown as ApiAppointmentData[];
        console.log('[useMedicAppointments] Total de citas obtenidas:', appointmentsData.length);

        // Transformar las citas al formato que esperan los componentes
        const transformedAppointments: TransformedAppointment[] = [];

        // Obtener información de pacientes de forma paralela
        console.log('[useMedicAppointments] Obteniendo información de pacientes...');
        const patientPromises = appointmentsData.map(async (appointment) => {
          try {
            const patientResponse = await api.users.getPatientById(appointment.patient_id);
            console.log(`[useMedicAppointments] Paciente ${appointment.patient_id} obtenido`);
            return patientResponse.success ? patientResponse.data : null;
          } catch (err) {
            console.error(`[useMedicAppointments] Error obteniendo paciente ${appointment.patient_id}:`, err);
            return null;
          }
        });

        const patientsData: (PatientUser | null)[] = await Promise.all(patientPromises);
        console.log('[useMedicAppointments] Total de pacientes obtenidos:', patientsData.filter(p => p !== null).length);

        appointmentsData.forEach((appointment, index) => {
          const patient = patientsData[index];
          const patientName = patient 
            ? `${patient.first_name} ${patient.last_name}`
            : `Paciente ${appointment.patient_id}`;

          // Convertir la fecha a hora
          const startDate = new Date(appointment.start_at);
          const timeString = startDate.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });

          // Determinar el tipo
          const type = appointment.type === 'in_person' ? 'Presencial' : 'Virtual';
          
          // Determinar el estado basado en la fecha
          const now = new Date();
          const status = startDate < now ? 'Finalizada' : 'Pendiente';

          transformedAppointments.push({
            id: appointment.id,
            time: timeString,
            patientName: patientName,
            type: type as 'Presencial' | 'Virtual',
            status: status as 'Finalizada' | 'Pendiente',
            patientId: appointment.patient_id.toString(),
            startDate: startDate,
          });
        });

        // Filtrar citas de hoy
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log('[useMedicAppointments] Filtrando citas de hoy:', today.toLocaleDateString());
        
        const todayAppointments = transformedAppointments.filter(app => {
          const appStartDate = new Date(app.startDate);
          appStartDate.setHours(0, 0, 0, 0);
          return appStartDate.getTime() === today.getTime();
        });

        console.log('[useMedicAppointments] Citas de hoy encontradas:', todayAppointments.length);

        // Ordenar las citas de hoy por hora
        todayAppointments.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

        // Encontrar la próxima cita (primera cita pendiente de hoy o la primera cita futura)
        const pendingTodayAppointments = todayAppointments.filter(app => app.status === 'Pendiente');
        let nextAppt: NextAppointment | null = null;

        if (pendingTodayAppointments.length > 0) {
          const firstPending = pendingTodayAppointments[0];
          nextAppt = {
            patientName: firstPending.patientName,
            reason: 'Consulta médica',
            time: firstPending.time,
            isToday: true,
            patientId: firstPending.patientId,
            meetLink: firstPending.type === 'Virtual' ? 'https://meet.google.com/new' : undefined,
          };
        } else {
          // Si no hay citas pendientes hoy, buscar la próxima cita futura
          const futureAppointments = transformedAppointments
            .filter(app => app.status === 'Pendiente' && app.startDate > new Date())
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

          if (futureAppointments.length > 0) {
            const next = futureAppointments[0];
            nextAppt = {
              patientName: next.patientName,
              reason: 'Consulta médica',
              time: next.time,
              isToday: false,
              patientId: next.patientId,
              meetLink: next.type === 'Virtual' ? 'https://meet.google.com/new' : undefined,
            };
          }
        }

        // Convertir a formato Appointment (sin startDate)
        const todayAppointmentsFormatted: Appointment[] = todayAppointments.map(({ startDate, ...rest }) => rest);
        console.log('[useMedicAppointments] Próxima cita configurada:', nextAppt ? nextAppt.patientName : 'Ninguna');

        setAppointments(todayAppointmentsFormatted);
        setNextAppointment(nextAppt);
        setError(null);
        console.log('[useMedicAppointments] Hook completado exitosamente');
      } catch (err: any) {
        console.error('[useMedicAppointments] Error en fetchAppointments:', err);
        console.error('[useMedicAppointments] Detalles del error:', {
          status: err?.response?.status,
          statusText: err?.response?.statusText,
          message: err?.message
        });
        
        // Si es error 401, solo loguear pero no mostrar error al usuario
        if (err?.response?.status === 401) {
          console.log('[useMedicAppointments] No autenticado - Las citas se mostrarán cuando inicies sesión');
          setError(null); // No mostrar error al usuario
        } else {
          setError(err instanceof Error ? err.message : 'Error al obtener las citas');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return { appointments, nextAppointment, loading, error };
};

