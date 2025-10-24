import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";
import { CreateAppointmentDto } from "../dto/appointment/createAppointment.dto";
import { UpdateAppointmentDto } from "../dto/appointment/updateAppointment.dto";

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
   * /api/medic/appointments/{medic_id}:
   *   post:
   *     summary: Crear cita (médico)
   *     description: Permite a un médico crear una nueva cita
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: medic_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del médico
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
      const { medic_id } = request.params;
      const body = request.body as CreateAppointmentDto;

      // Set medic_id from URL parameter
      body.medic_id = parseInt(medic_id);

      // If user is a patient, infer patient_id from JWT
      if (request.user && (request.user as any).role === "patient") {
        body.patient_id = (request.user as any).id;
      }

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
   * /api/patient/appointments/{patient_id}:
   *   post:
   *     summary: Crear cita (paciente)
   *     description: Permite a un paciente crear una nueva cita
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: patient_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del paciente
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
  public createAppointmentAsPatient = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { paciente_id } = request.params;
      const body = request.body as CreateAppointmentDto;

      // Set patient_id from URL parameter
      body.patient_id = parseInt(paciente_id);

      // If user is a medic, infer medic_id from JWT
      if (request.user && (request.user as any).role === "medic") {
        body.medic_id = (request.user as any).id;
      }

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
   * /api/medic/appointments/:
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
   * /api/patient/appointments/:
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
      const { start_date } = request.query;
      const patientId = (request.user as any).id;

      const appointments =
        await this.appointmentService.getAppointmentsByPatient(
          patientId,
          start_date as string
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

      // Check if the appointment belongs to the logged-in medic
      if (appointment.doctor_id !== (request.user as any).id) {
        return response.status(403).json({
          success: false,
          message: "No tienes permisos para ver esta cita",
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
   * /api/patient/appointments/{id}:
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

      // Check if the appointment belongs to the logged-in patient
      if (appointment.patient_id !== (request.user as any).id) {
        return response.status(403).json({
          success: false,
          message: "No tienes permisos para ver esta cita",
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
   * /api/medic/appointments/{paciente_id}/{id_cita}:
   *   put:
   *     summary: Actualizar cita (médico)
   *     description: Permite a un médico actualizar una cita existente
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: paciente_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del paciente
   *       - in: path
   *         name: id_cita
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la cita
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
      const { id_cita } = request.params;
      const body = request.body as UpdateAppointmentDto;

      const appointment = await this.appointmentService.updateAppointment(
        parseInt(id_cita),
        body,
        "medic"
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
   * /api/patient/appointments/{medic_id}/{id_cita}:
   *   put:
   *     summary: Actualizar cita (paciente)
   *     description: Permite a un paciente actualizar una cita existente
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: medic_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del médico
   *       - in: path
   *         name: id_cita
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la cita
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
      const { id_cita } = request.params;
      const body = request.body as UpdateAppointmentDto;

      const appointment = await this.appointmentService.updateAppointment(
        parseInt(id_cita),
        body,
        "patient"
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
   * /api/medic/appointments/{paciente_id}/{id_cita}:
   *   delete:
   *     summary: Cancelar cita (médico)
   *     description: Permite a un médico cancelar una cita existente
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: paciente_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del paciente
   *       - in: path
   *         name: id_cita
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la cita
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
  public deleteMedicAppointment = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { id_cita } = request.params;

      await this.appointmentService.deleteAppointment(parseInt(id_cita));

      return response.status(204).json({
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
   * /api/patient/appointments/{medic_id}/{id_cita}:
   *   delete:
   *     summary: Cancelar cita (paciente)
   *     description: Permite a un paciente cancelar una cita existente
   *     tags: [Appointments]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: medic_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del médico
   *       - in: path
   *         name: id_cita
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la cita
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
  // Delete appointment (for patient)
  public deletePatientAppointment = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { id_cita } = request.params;

      await this.appointmentService.deleteAppointment(parseInt(id_cita));

      return response.status(204).json({
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
}
