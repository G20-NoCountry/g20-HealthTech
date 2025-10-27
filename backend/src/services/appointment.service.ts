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

      // Check for overlapping appointments
      const overlappingAppointment = await this.checkForOverlappingAppointments(
        appointmentData.medic_id,
        appointmentData.start_at,
        appointmentData.end_at
      );

      if (overlappingAppointment) {
        throw new Error("Ya existe una cita en ese horario para este médico");
      }

      const appointment = await Appointment.create(appointmentData as any);
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
    try {
      const whereClause: any = {
        medic_id: medicId,
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
    } catch (error) {
      throw error;
    }
  }

  public async getAppointmentsByPatient(
    patientId: number,
    startDate?: string,
    endDate?: string
  ): Promise<Appointment[]> {
    try {
      const whereClause: any = {
        patient_id: patientId,
      };

      //$ [FIX] - En un if cuando hay una sola línea, se puede usar sin llaves.
      //$ [FIX] - Tenías un problema al usar el operador between, estás obligando a pasar ambos valores, se aplico una solución eficiente.
      if (startDate)
        whereClause.start_at = {
          [Op.gte]: new Date(startDate),
        };

      if (endDate)
        whereClause.end_at = {
          [Op.lte]: new Date(endDate),
        };


      const appointments = await Appointment.findAll({
        where: whereClause,
        order: [["start_at", "ASC"]],
      });

      return appointments;
    } catch (error) {
      throw error;
    }
  }

  public async getAppointmentById(
    appointmentId: number
  ): Promise<Appointment | null> {
    try {
      const appointment = await Appointment.findByPk(appointmentId);
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  public async updateAppointment(
    appointmentId: number,
    updateData: UpdateAppointmentDto
  ): Promise<Appointment> {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      throw new Error("Cita no encontrada");
    }
    // Check for overlapping appointments if start_at is being updated
    if (updateData.start_at) {
      const overlappingAppointment = await this.checkForOverlappingAppointments(
        updateData.medic_id ?? appointment.medic_id,
        updateData.start_at || appointment.start_at.toISOString(),
        updateData.start_at || appointment.start_at.toISOString()
      );

      if (overlappingAppointment) {
        throw new Error("Ya existe una cita en ese horario para este médico");
      }
    }
    await appointment.update(updateData as any);
    return appointment;
  }

  //$ [FIX] - Se puede dar como sobre entendido que el "id" como parámetro pertenece a una cita, implicitamente el nombre del método te afirma que es un id de cita (o algún otro recurso en particular).
  public async deleteAppointment(id: number): Promise<boolean> {
    try {
      const appointment = await Appointment.findByPk(id);

      if (!appointment) {
        throw new Error("Cita no encontrada");
      }

      await appointment.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }

  private async checkForOverlappingAppointments(
    medicId: number,
    startDate: string,
    endDate: string
  ): Promise<boolean> {
    //$ [FIX] - Quizás sea mejor devolver un boolean en vez de la cita completa.
    //$ [FIX] - No es necesario usar try-catch si se devuevle un throw, ya que el error se propagará automáticamente.
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
