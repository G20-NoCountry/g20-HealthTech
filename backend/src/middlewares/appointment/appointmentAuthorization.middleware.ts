import { Request, Response, NextFunction } from "express";
import Appointment from "../../models/Appointment";
import { User } from "../../models";

// Extender la interfaz Request para incluir appointment
declare global {
  namespace Express {
    interface Request {
      appointment?: Appointment;
    }
  }
}

/**
 * Middleware para validar que el médico sea dueño de la cita
 */
export async function canDeleteMedicAppointment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = req.user as User;

    if (!user || user.rol !== "medico") {
      return res.status(403).json({
        success: false,
        message: "Solo los médicos pueden eliminar citas",
      });
    }

    const appointment = await Appointment.findByPk(parseInt(id));
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada",
      });
    }

    if (appointment.medic_id !== user.id) {
      return res.status(403).json({
        success: false,
        message: "Solo puedes eliminar tus propias citas",
      });
    }

    // Agregar la cita al request para uso posterior
    req.appointment = appointment;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al validar autorización",
    });
  }
}

/**
 * Middleware para validar que el paciente sea dueño de la cita
 */
export async function canDeletePatientAppointment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = req.user as User;

    if (!user || user.rol !== "paciente") {
      return res.status(403).json({
        success: false,
        message: "Solo los pacientes pueden eliminar sus citas",
      });
    }

    const appointment = await Appointment.findByPk(parseInt(id));
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada",
      });
    }

    if (appointment.patient_id !== user.id) {
      return res.status(403).json({
        success: false,
        message: "Solo puedes eliminar tus propias citas",
      });
    }

    // Agregar la cita al request para uso posterior
    req.appointment = appointment;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al validar autorización",
    });
  }
}

/**
 * Middleware para validar que el médico pueda actualizar la cita
 */
export async function canUpdateMedicAppointment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const user = req.user as User;

    if (!user || user.rol !== "medico") {
      return res.status(403).json({
        success: false,
        message: "Solo los médicos pueden actualizar citas",
      });
    }

    const appointment = await Appointment.findByPk(body.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada",
      });
    }

    if (appointment.medic_id !== user.id) {
      return res.status(403).json({
        success: false,
        message: "Solo puedes actualizar tus propias citas",
      });
    }

    req.appointment = appointment;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al validar autorización",
    });
  }
}

/**
 * Middleware para validar que el paciente pueda actualizar la cita
 */
export async function canUpdatePatientAppointment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const user = req.user as User;

    if (!user || user.rol !== "paciente") {
      return res.status(403).json({
        success: false,
        message: "Solo los pacientes pueden actualizar sus citas",
      });
    }

    const appointment = await Appointment.findByPk(body.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada",
      });
    }

    if (appointment.patient_id !== user.id) {
      return res.status(403).json({
        success: false,
        message: "Solo puedes actualizar tus propias citas",
      });
    }

    req.appointment = appointment;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al validar autorización",
    });
  }
}
