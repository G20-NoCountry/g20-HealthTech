import { Request, Response, NextFunction } from 'express';
import { Role, User } from '../../models';

export async function canRegister(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const roleRegister = await Role.findOne({ where: { id: body.role_id } });
  if (!roleRegister) {
    throw new Error('role_id no válido');
  }

  if (roleRegister.rol == "doctor") {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: 'La sesión no es válida o ha expirado',
      });
    }
    const adminRoleId = await Role.findOne({ where: { rol: "admin" }, attributes: ["id"] });
    if (adminRoleId) {
      if ((req.user as User).role_id != adminRoleId.id) {
        return res.status(403).json({
          success: false,
          message: 'No puede realizar esta acción',
        });
      }
    }

    return next();
  }

  if (roleRegister.rol == "patient") {
    if (req.isAuthenticated()) {
      return res.status(403).json({
        success: false,
        message: 'No puede realizar esta acción',
      });
    }
    return next();
  }
}
