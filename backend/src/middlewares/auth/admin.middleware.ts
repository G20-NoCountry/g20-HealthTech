import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar permisos de administrador
 * Solo verifica que se proporcione la contraseña de administrador correcta
 * No requiere autenticación de usuario
 */
export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
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
