import { Request, Response, NextFunction } from "express";
import { User } from "../../models";

/**
 * Middleware para validar permisos de administrador
 * Verifica que el usuario autenticado tenga rol de médico
 * y que proporcione la contraseña de administrador correcta
 */
export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as User;
    
    // Verificar que el usuario esté autenticado
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
      });
    }

    // Verificar que sea médico
    if (user.rol !== "medico") {
      return res.status(403).json({
        success: false,
        message: "Solo los médicos pueden registrar otros médicos",
      });
    }

    // Verificar contraseña de administrador
    const adminPassword = req.body.admin_password as string;
    
    if (!adminPassword) {
      return res.status(400).json({
        success: false,
        message: "Contraseña de administrador requerida",
      });
    }

    const isAdminPasswordValid = process.env.ADMIN_PASSWORD === adminPassword;
    
    if (!isAdminPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Contraseña de administrador incorrecta",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al validar permisos de administrador",
    });
  }
}
