import { Request, Response, NextFunction } from "express";
import { User } from "../../models";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;

  // En el nuevo esquema, solo 'medico' puede registrar otros médicos
  // Los administradores serían médicos con permisos especiales
  if (user.rol !== "medico") {
    return res.status(403).json({
      success: false,
      message: "No puede realizar esta acción",
    });
  }

  return next();
}
