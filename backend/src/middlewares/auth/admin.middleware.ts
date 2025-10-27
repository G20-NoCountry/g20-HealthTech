import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import { env } from "process";

//$ [FIX]
export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const adminPassword = req.body.admin_password as string;
  const isAdmin = env.ADMIN_PASSWORD === adminPassword;

  // En el nuevo esquema, solo 'medico' puede registrar otros médicos
  // Los administradores serían médicos con permisos especiales
  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Usted no es administrador.",
    });
  }

  return next();
}
