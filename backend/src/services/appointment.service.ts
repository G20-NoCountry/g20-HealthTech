import Appointment from "../models/Appointment";
import { CreateAppointmentDto } from "../dto/appointment/createAppointment.dto";
import { UpdateAppointmentDto } from "../dto/appointment/updateAppointment.dto";
import { Op } from "sequelize";

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

  public async getAppointmentsByMedic(
    medicId: number,
    startDate?: string,
    endDate?: string
  ): Promise<Appointment[]> {
    try {
      const whereClause: any = {
        medic_id: medicId,
      };

      if (startDate && endDate) {
        whereClause.start_at = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
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

      if (startDate && endDate) {
        whereClause.start_at = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
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
    updateData: UpdateAppointmentDto,
    userRole: "medic" | "patient"
  ): Promise<Appointment> {
    try {
      const appointment = await Appointment.findByPk(appointmentId);

      if (!appointment) {
        throw new Error("Cita no encontrada");
      }

      // If updating time, check for overlapping appointments
      if (updateData.start_at || updateData.end_at) {
        const startTime =
          updateData.start_at || appointment.start_at.toISOString();
        const endTime = updateData.end_at || appointment.end_at.toISOString();

        const overlappingAppointment =
          await this.checkForOverlappingAppointments(
            appointment.doctor_id,
            startTime,
            endTime,
            appointmentId
          );

        if (overlappingAppointment) {
          throw new Error("Ya existe una cita en ese horario para este médico");
        }
      }

      // Restrict certain fields based on user role
      if (userRole === "patient") {
        // Patients can only update time, type, and symptoms
        const allowedFields = ["start_at", "end_at", "type", "symptoms"];
        const filteredData: any = {};
        Object.keys(updateData).forEach((key) => {
          if (allowedFields.includes(key)) {
            filteredData[key] = updateData[key as keyof UpdateAppointmentDto];
          }
        });

        await appointment.update(filteredData);
      } else {
        // Medics can update all fields
        await appointment.update(updateData as any);
      }

      return appointment;
    } catch (error) {
      throw error;
    }
  }

  public async deleteAppointment(appointmentId: number): Promise<boolean> {
    try {
      const appointment = await Appointment.findByPk(appointmentId);

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
    startAt: string | Date,
    endAt: string | Date,
    excludeId?: number
  ): Promise<Appointment | null> {
    try {
      const whereClause: any = {
        medic_id: medicId,
        [Op.or]: [
          {
            start_at: {
              [Op.between]: [new Date(startAt), new Date(endAt)],
            },
          },
          {
            end_at: {
              [Op.between]: [new Date(startAt), new Date(endAt)],
            },
          },
          {
            [Op.and]: [
              { start_at: { [Op.lte]: new Date(startAt) } },
              { end_at: { [Op.gte]: new Date(endAt) } },
            ],
          },
        ],
      };

      if (excludeId) {
        whereClause.id = { [Op.ne]: excludeId };
      }

      const overlappingAppointment = await Appointment.findOne({
        where: whereClause,
      });

      return overlappingAppointment;
    } catch (error) {
      throw error;
    }
  }
}
