import { Request, Response, NextFunction } from 'express';
import { Role, User } from '../../models';

export async function canAccessPatient(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;
  const userId = parseInt(req.params.id);
  const userRole = await Role.findOne({ where: { id: user.role_id } });

  if (userRole) {
    if (userRole.rol == "patient") {
      if (user.id != userId) {
        return res.status(403).json({
          success: false,
          message: 'No puede realizar esta acción',
        });
      }
    }
  }
  return next();
};
