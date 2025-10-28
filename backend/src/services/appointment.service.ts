import Appointment from "../models/Appointment";
import { CreateAppointmentDto } from "../dto/appointment/createAppointment.dto";
import { UpdateAppointmentDto } from "../dto/appointment/updateAppointment.dto";
import { Op } from "sequelize";
import { start } from "repl";

export class AppointmentService {
  public async createAppointment(
    appointmentData: CreateAppointmentDto
  ): Promise<Appointment> {
    try {
      // Validate required fields
      if (!appointmentData.medic_id || !appointmentData.patient_id) {
        throw new Error("medic_id y patient_id son requeridos");
      }

      // Si end_at no se proporciona, calcularlo automáticamente (start_at + 30 minutos)
      let endAt = appointmentData.end_at;
      if (!endAt && appointmentData.start_at) {
        const startAtDate = new Date(appointmentData.start_at);
        const endAtDate = new Date(startAtDate);
        endAtDate.setMinutes(endAtDate.getMinutes() + 30);
        endAt = endAtDate.toISOString();
      }

      // Check for overlapping appointments
      const overlappingAppointment = await this.checkForOverlappingAppointments(
        appointmentData.medic_id,
        appointmentData.start_at,
        endAt!
      );

      if (overlappingAppointment) {
        throw new Error("Ya existe una cita en ese horario para este médico");
      }

      const appointment = await Appointment.create({
        ...appointmentData,
        end_at: endAt!
      } as any);
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  private roundUpToSlot(date: Date, slotMinutes: number): Date {
    const d = new Date(date);
    d.setSeconds(0, 0);
    const minutes = d.getMinutes();
    const remainder = minutes % slotMinutes;
    if (remainder !== 0) {
      d.setMinutes(minutes + (slotMinutes - remainder));
    }
    return d;
  }

  public async getAppointmentsByMedic(
    medicId: number,
    startDate?: string
  ): Promise<Appointment[]> {
    const whereClause: any = {
      medic_id: medicId,
      deleted_at: null, // Solo citas activas
    };

    if (startDate) {
      whereClause.start_at = {
        [Op.gte]: new Date(startDate),
      };
    }

    const appointments = await Appointment.findAll({
      where: whereClause,
      order: [["start_at", "ASC"]],
    });

    return appointments;
  }

  public async getAppointmentsByPatient(
    patientId: number,
    startDate?: string,
    endDate?: string
  ): Promise<Appointment[]> {
    const whereClause: any = {
      patient_id: patientId,
      deleted_at: null, // Solo citas activas
    };

    if (startDate) {
      whereClause.start_at = {
        [Op.gte]: new Date(startDate),
      };
    }

    if (endDate) {
      whereClause.end_at = {
        [Op.lte]: new Date(endDate),
      };
    }

    const appointments = await Appointment.findAll({
      where: whereClause,
      order: [["start_at", "ASC"]],
    });

    return appointments;
  }

  public async getAppointmentById(
    appointmentId: number
  ): Promise<Appointment | null> {
    const appointment = await Appointment.findOne({
      where: {
        id: appointmentId,
        deleted_at: null, // Solo citas activas
      } as any
    });
    return appointment;
  }

  public async updateAppointment(
    appointmentId: number,
    updateData: UpdateAppointmentDto
  ): Promise<Appointment> {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      throw new Error("Cita no encontrada");
    }
    // Check for overlapping appointments if start_at or end_at is being updated
    if (updateData.start_at || updateData.end_at) {
      const overlappingAppointment = await this.checkForOverlappingAppointments(
        updateData.medic_id ?? appointment.medic_id,
        updateData.start_at || appointment.start_at.toISOString(),
        updateData.end_at || appointment.end_at.toISOString()
      );

      if (overlappingAppointment) {
        throw new Error("Ya existe una cita en ese horario para este médico");
      }
    }
    await appointment.update(updateData as any);
    return appointment;
  }

  // Cancelar cita (borrado lógico)
  public async cancelAppointment(id: number, reason?: string): Promise<boolean> {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      throw new Error("Cita no encontrada");
    }

    if (appointment.deleted_at) {
      throw new Error("La cita ya está cancelada");
    }

    await (appointment as any).softDelete(reason);
    return true;
  }

  // Restaurar cita cancelada
  public async restoreAppointment(id: number): Promise<boolean> {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      throw new Error("Cita no encontrada");
    }

    if (!appointment.deleted_at) {
      throw new Error("La cita no está cancelada");
    }

    await (appointment as any).restore();
    return true;
  }

  // Obtener citas canceladas
  public async getCancelledAppointments(
    medicId?: number,
    patientId?: number
  ): Promise<Appointment[]> {
    const whereClause: any = {
      deleted_at: { [Op.ne]: null },
    };

    if (medicId) {
      whereClause.medic_id = medicId;
    }

    if (patientId) {
      whereClause.patient_id = patientId;
    }

    const appointments = await Appointment.findAll({
      where: whereClause,
      order: [["deleted_at", "DESC"]],
    });

    return appointments;
  }

  // Eliminar permanentemente (solo para administradores)
  public async permanentDeleteAppointment(id: number): Promise<boolean> {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      throw new Error("Cita no encontrada");
    }

    await appointment.destroy();
    return true;
  }

  /**
   * Obtiene los horarios disponibles para un médico en una fecha específica
   */
  public async getAvailability(
    medicId: number,
    date: string,
    durationMinutes: number = 30
  ): Promise<string[]> {
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(9, 0, 0, 0); // 9:00 AM
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(17, 0, 0, 0); // 5:00 PM

    // Obtener citas existentes para el médico en esa fecha
    const existingAppointments = await Appointment.findAll({
      where: {
        medic_id: medicId,
        start_at: {
          [Op.between]: [startOfDay, endOfDay],
        },
        deleted_at: null, // Solo citas activas
        status: 'scheduled', // Solo citas programadas
      } as any,
      order: [["start_at", "ASC"]],
    });

    // Generar todos los slots posibles
    const allSlots: string[] = [];
    const currentTime = new Date(startOfDay);
    
    while (currentTime < endOfDay) {
      const timeString = currentTime.toTimeString().slice(0, 5); // HH:MM
      allSlots.push(timeString);
      currentTime.setMinutes(currentTime.getMinutes() + durationMinutes);
    }

    // Filtrar slots ocupados
    const occupiedSlots = existingAppointments.map(appointment => {
      const appointmentTime = new Date(appointment.start_at);
      return appointmentTime.toTimeString().slice(0, 5);
    });

    // Retornar slots disponibles
    return allSlots.filter(slot => !occupiedSlots.includes(slot));
  }

  private async checkForOverlappingAppointments(
    medicId: number,
    startDate: string,
    endDate: string
  ): Promise<boolean> {
    // Retorna un boolean indicando si hay solapamiento
    // Los errores se propagan automáticamente sin try-catch innecesario
    const whereClause: any = {
      medic_id: medicId,
      [Op.or]: [
        {
          start_at: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
        {
          end_at: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
        {
          start_at: {
            [Op.lte]: new Date(startDate),
          },
          end_at: {
            [Op.gte]: new Date(endDate),
          },
        },
      ],
    };

    const overlappingAppointment = await Appointment.findOne({
      where: whereClause,
    });

    return !!overlappingAppointment;
  }
}
