import { request, Request, RequestHandler, Response } from "express";
import { AppointmentService } from "../services/appointment.service";
import { CreateAppointmentDto } from "../dto/appointment/createAppointment.dto";
import { UpdateAppointmentDto } from "../dto/appointment/updateAppointment.dto";
import { User } from "../models";

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Gestión de citas médicas
 */

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  /**
   * @swagger
   * /api/medic/appointments:
   *   post:
   *     summary: Crear cita (médico)
   *     description: Permite a un médico crear una nueva cita. IDs se envían en el cuerpo.
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAppointmentRequest'
   *     responses:
   *       201:
   *         description: Cita creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Cita creada exitosamente"
   *                 data:
   *                   $ref: '#/components/schemas/Appointment'
   *       400:
   *         description: Error en la solicitud
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Create appointment (for medic)
  public createAppointmentAsMedic = async (
    request: Request,
    response: Response
  ) => {
    try {
      const body = request.body as CreateAppointmentDto;
      const user = request.user as User;

      // Validar rol y propiedad de la cita
      if (!user || user.rol !== "medico")
        throw new Error("Solo los médicos pueden crear citas como médicos.");

      if (user.id !== body.medic_id)
        throw new Error("No puedes crear citas para otro médico.");

      const appointment = await this.appointmentService.createAppointment(body);

      return response.status(201).json({
        success: true,
        message: "Cita creada exitosamente",
        data: appointment,
      });
    } catch (error: any) {
      return response.status(400).json({
        success: false,
        message: error.message || "Error al crear la cita",
        data: null,
      });
    }
  };


  /**
   * @swagger
   * /api/paciente/appointments:
   *   post:
   *     summary: Crear cita (paciente)
   *     description: Permite a un paciente crear una nueva cita. IDs se envían en el cuerpo.
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAppointmentRequest'
   *     responses:
   *       201:
   *         description: Cita creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Cita creada exitosamente para el paciente"
   *                 data:
   *                   $ref: '#/components/schemas/Appointment'
   *       400:
   *         description: Error en la solicitud
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Create appointment (for patient)
  public createAppointmentAsPatient: RequestHandler = async (
    request: Request<any, any, CreateAppointmentDto>,
    response: Response
  ) => {
    try {
      const user = request.user as User;
      const body = request.body;

      // Set patient_id from URL parameter
      // Si el usuario es médico, no puede crear citas como paciente
      if (request.user && user?.rol === "medico")
        throw new Error("Los médicos no pueden crear citas como pacientes.");

      // Validar que el paciente solo pueda solicitar citas para sí mismo
      if (user.id !== body.patient_id)
        throw new Error("No puedes solicitar citas para otros pacientes.");

      const appointment = await this.appointmentService.createAppointment(body);

      return response.status(201).json({
        success: true,
        message: "Cita creada exitosamente",
        data: appointment,
      });
    } catch (error: any) {
      return response.status(400).json({
        success: false,
        message: error.message || "Error al crear la cita",
        data: null,
      });
    }
  }

  /**
   * @swagger
   * /api/medic/appointments:
   *   get:
   *     summary: Listar citas del médico logueado
   *     description: Obtiene todas las citas del médico autenticado, opcionalmente filtradas por fecha
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: query
   *         name: start_date
   *         schema:
   *           type: string
   *           format: date
   *         description: Fecha de inicio del filtro (YYYY-MM-DD)
   *       - in: query
   *         name: end_date
   *         schema:
   *           type: string
   *           format: date
   *         description: Fecha de fin del filtro (YYYY-MM-DD)
   *     responses:
   *       200:
   *         description: Lista de citas obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Citas obtenidas exitosamente"
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Appointment'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Get appointments for medic
  public getMedicAppointments = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { start_date } = request.query;
      const medicId = (request.user as any).id;

      const appointments = await this.appointmentService.getAppointmentsByMedic(
        medicId,
        start_date as string
      );

      return response.status(200).json({
        success: true,
        message: "Citas obtenidas exitosamente",
        data: appointments,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message || "Error al obtener las citas",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/paciente/appointments:
   *   get:
   *     summary: Listar citas del paciente logueado
   *     description: Obtiene todas las citas del paciente autenticado, opcionalmente filtradas por fecha
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: query
   *         name: start_date
   *         schema:
   *           type: string
   *           format: date
   *         description: Fecha de inicio del filtro (YYYY-MM-DD)
   *       - in: query
   *         name: end_date
   *         schema:
   *           type: string
   *           format: date
   *         description: Fecha de fin del filtro (YYYY-MM-DD)
   *     responses:
   *       200:
   *         description: Lista de citas obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Citas obtenidas exitosamente para el paciente"
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Appointment'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Get appointments for patient
  public getPatientAppointments = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { start_date, end_date } = request.query as { start_date?: string; end_date?: string };
      const patientId = (request.user as any).id;

      const appointments =
        await this.appointmentService.getAppointmentsByPatient(
          patientId,
          start_date,
          end_date
        );

      return response.status(200).json({
        success: true,
        message: "Citas obtenidas exitosamente para el paciente",
        data: appointments,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message || "Error al obtener las citas",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/medic/appointments/{id}:
   *   get:
   *     summary: Obtener cita por ID (médico)
   *     description: Obtiene una cita específica por su ID para el médico autenticado
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la cita
   *     responses:
   *       200:
   *         description: Cita obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Cita obtenida exitosamente"
   *                 data:
   *                   $ref: '#/components/schemas/Appointment'
   *       403:
   *         description: No tienes permisos para ver esta cita
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Cita no encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Get appointment details (for medic)
  public getMedicAppointmentById = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { id } = request.params;
      const appointment = await this.appointmentService.getAppointmentById(
        parseInt(id)
      );

      if (!appointment) {
        return response.status(404).json({
          success: false,
          message: "Cita no encontrada",
          data: null,
        });
      }


      return response.status(200).json({
        success: true,
        message: "Cita obtenida exitosamente",
        data: appointment,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message || "Error al obtener la cita",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/paciente/appointments/{id}:
   *   get:
   *     summary: Obtener cita por ID (paciente)
   *     description: Obtiene una cita específica por su ID para el paciente autenticado
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la cita
   *     responses:
   *       200:
   *         description: Cita obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Cita obtenida exitosamente"
   *                 data:
   *                   $ref: '#/components/schemas/Appointment'
   *       403:
   *         description: No tienes permisos para ver esta cita
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Cita no encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Get appointment details (for patient)
  public getPatientAppointmentById = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { id } = request.params;
      const appointment = await this.appointmentService.getAppointmentById(
        parseInt(id)
      );

      if (!appointment) {
        return response.status(404).json({
          success: false,
          message: "Cita no encontrada",
          data: null,
        });
      }


      return response.status(200).json({
        success: true,
        message: "Cita obtenida exitosamente",
        data: appointment,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message || "Error al obtener la cita",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/medic/appointments:
   *   patch:
   *     summary: Actualizar cita (médico)
   *     description: Permite a un médico actualizar una cita existente. IDs se envían en el cuerpo.
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateAppointmentRequest'
   *     responses:
   *       200:
   *         description: Cita actualizada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Cita actualizada exitosamente"
   *                 data:
   *                   $ref: '#/components/schemas/Appointment'
   *       400:
   *         description: Error en la solicitud
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Update appointment (for medic)
  public updateMedicAppointment = async (
    request: Request,
    response: Response
  ) => {
    try {
      const body = request.body as UpdateAppointmentDto;
      const user = request.user as User;

      if (!user || user.rol !== "medico")
        throw new Error("Solo los médicos pueden actualizar citas como médicos.");

      if (user.id !== body.medic_id)
        throw new Error("No puedes actualizar citas de otro médico.");

      const appointment = await this.appointmentService.updateAppointment(
        body.id,
        body
      );

      return response.status(200).json({
        success: true,
        message: "Cita actualizada exitosamente",
        data: appointment,
      });
    } catch (error: any) {
      return response.status(400).json({
        success: false,
        message: error.message || "Error al actualizar la cita",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/paciente/appointments:
   *   patch:
   *     summary: Actualizar cita (paciente)
   *     description: Permite a un paciente actualizar una cita existente
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateAppointmentRequest'
   *     responses:
   *       200:
   *         description: Cita actualizada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Cita actualizada exitosamente"
   *                 data:
   *                   $ref: '#/components/schemas/Appointment'
   *       400:
   *         description: Error en la solicitud
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Update appointment (for patient)
  public updatePatientAppointment = async (
    request: Request,
    response: Response
  ) => {
    try {
      const body = request.body as UpdateAppointmentDto;
      const user = request.user as User;

      // Solo validar si es paciente (los médicos ya están autorizados por el middleware)
      if (user.rol === "paciente" && user.id !== body.patient_id) {
        throw new Error("No puedes editar citas de otros pacientes.");
      }

      const appointment = await this.appointmentService.updateAppointment(
        body.id,
        body
      );

      return response.status(200).json({
        success: true,
        message: "Cita actualizada exitosamente",
        data: appointment,
      });
    } catch (error: any) {
      return response.status(400).json({
        success: false,
        message: error.message || "Error al actualizar la cita",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/medic/patient-appointments:
   *   patch:
   *     summary: Actualizar cita de paciente (médico)
   *     description: Permite a un médico actualizar citas de pacientes para agregar síntomas, diagnósticos, etc.
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateAppointmentRequest'
   *     responses:
   *       200:
   *         description: Cita actualizada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Cita actualizada exitosamente"
   *                 data:
   *                   $ref: '#/components/schemas/Appointment'
   *       400:
   *         description: Error en la solicitud
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Update patient appointment (for medic) - reutiliza el mismo método
  public updatePatientAppointmentAsMedic = async (
    request: Request,
    response: Response
  ) => {
    // Reutiliza la misma lógica que updatePatientAppointment
    return this.updatePatientAppointment(request, response);
  };

  /**
   * @swagger
   * /api/medic/appointments/{id}:
   *   delete:
   *     summary: Cancelar cita (médico)
   *     description: Permite a un médico cancelar una cita existente
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la cita
   *       - in: query
   *         name: reason
   *         required: false
   *         schema:
   *           type: string
   *         description: Razón de la cancelación
   *     responses:
   *       204:
   *         description: Cita cancelada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Cita cancelada exitosamente"
   *                 data:
   *                   type: null
   *                   example: null
   *       400:
   *         description: Error en la solicitud
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Delete appointment (for medic)
  // Cancelar cita (médico)
  public cancelMedicAppointment = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { id } = request.params;
      const { reason } = request.query;

      await this.appointmentService.cancelAppointment(parseInt(id), reason as string);

      return response.status(200).json({
        success: true,
        message: "Cita cancelada exitosamente",
        data: null,
      });
    } catch (error: any) {
      return response.status(400).json({
        success: false,
        message: error.message || "Error al cancelar la cita",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/paciente/appointments/{id}:
   *   delete:
   *     summary: Cancelar cita (paciente)
   *     description: Permite a un paciente cancelar una cita existente
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la cita
   *       - in: query
   *         name: reason
   *         required: false
   *         schema:
   *           type: string
   *         description: Razón de la cancelación
   *     responses:
   *       204:
   *         description: Cita cancelada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Cita cancelada exitosamente"
   *                 data:
   *                   type: null
   *                   example: null
   *       400:
   *         description: Error en la solicitud
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  // Cancelar cita (paciente)
  public cancelPatientAppointment = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { id } = request.params;
      const { reason } = request.query;

      await this.appointmentService.cancelAppointment(parseInt(id), reason as string);

      return response.status(200).json({
        success: true,
        message: "Cita cancelada exitosamente",
        data: null,
      });
    } catch (error: any) {
      return response.status(400).json({
        success: false,
        message: error.message || "Error al cancelar la cita",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/appointments/availability:
   *   get:
   *     summary: Verificar disponibilidad de citas
   *     description: Obtiene los horarios disponibles para un médico en una fecha específica
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: query
   *         name: medic_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del médico
   *       - in: query
   *         name: date
   *         required: true
   *         schema:
   *           type: string
   *           format: date
   *         description: Fecha para verificar disponibilidad (YYYY-MM-DD)
   *       - in: query
   *         name: duration
   *         required: false
   *         schema:
   *           type: integer
   *           default: 30
   *         description: Duración de la cita en minutos
   *     responses:
   *       200:
   *         description: Horarios disponibles obtenidos exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Horarios disponibles obtenidos exitosamente"
   *                 data:
   *                   type: array
   *                   items:
   *                     type: string
   *                     format: time
   *                   example: ["09:00", "09:30", "10:00", "10:30"]
   *       400:
   *         description: Error en la solicitud
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public getAvailability = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { medic_id, date, duration = 30 } = request.query;
      
      if (!medic_id || !date) {
        return response.status(400).json({
          success: false,
          message: "medic_id y date son requeridos",
          data: null,
        });
      }

      const availability = await this.appointmentService.getAvailability(
        parseInt(medic_id as string),
        date as string,
        parseInt(duration as string)
      );

      return response.status(200).json({
        success: true,
        message: "Horarios disponibles obtenidos exitosamente",
        data: availability,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message || "Error al obtener disponibilidad",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/medic/appointments/{id}/restore:
   *   patch:
   *     summary: Restaurar cita cancelada (médico)
   *     description: Restaura una cita previamente cancelada
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la cita
   *     responses:
   *       200:
   *         description: Cita restaurada exitosamente
   *       400:
   *         description: Error en la solicitud
   */
  public restoreMedicAppointment = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { id } = request.params;

      await this.appointmentService.restoreAppointment(parseInt(id));

      return response.status(200).json({
        success: true,
        message: "Cita restaurada exitosamente",
        data: null,
      });
    } catch (error: any) {
      return response.status(400).json({
        success: false,
        message: error.message || "Error al restaurar la cita",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/medic/appointments/cancelled:
   *   get:
   *     summary: Obtener citas canceladas (médico)
   *     description: Obtiene todas las citas canceladas del médico
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     responses:
   *       200:
   *         description: Citas canceladas obtenidas exitosamente
   */
  public getCancelledMedicAppointments = async (
    request: Request,
    response: Response
  ) => {
    try {
      const medicId = (request.user as any).id;

      const appointments = await this.appointmentService.getCancelledAppointments(medicId);

      return response.status(200).json({
        success: true,
        message: "Citas canceladas obtenidas exitosamente",
        data: appointments,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message || "Error al obtener citas canceladas",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/paciente/appointments/{id}/restore:
   *   patch:
   *     summary: Restaurar cita cancelada (paciente)
   *     description: Restaura una cita previamente cancelada
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la cita
   *     responses:
   *       200:
   *         description: Cita restaurada exitosamente
   */
  public restorePatientAppointment = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { id } = request.params;

      await this.appointmentService.restoreAppointment(parseInt(id));

      return response.status(200).json({
        success: true,
        message: "Cita restaurada exitosamente",
        data: null,
      });
    } catch (error: any) {
      return response.status(400).json({
        success: false,
        message: error.message || "Error al restaurar la cita",
        data: null,
      });
    }
  };

  /**
   * @swagger
   * /api/paciente/appointments/cancelled:
   *   get:
   *     summary: Obtener citas canceladas (paciente)
   *     description: Obtiene todas las citas canceladas del paciente
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     responses:
   *       200:
   *         description: Citas canceladas obtenidas exitosamente
   */
  public getCancelledPatientAppointments = async (
    request: Request,
    response: Response
  ) => {
    try {
      const patientId = (request.user as any).id;

      const appointments = await this.appointmentService.getCancelledAppointments(undefined, patientId);

      return response.status(200).json({
        success: true,
        message: "Citas canceladas obtenidas exitosamente",
        data: appointments,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message || "Error al obtener citas canceladas",
        data: null,
      });
    }
  };
}
