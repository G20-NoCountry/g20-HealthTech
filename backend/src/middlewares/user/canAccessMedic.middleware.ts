import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';

export async function canAccessMedic(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;
  const userId = parseInt(req.params.id);

  if (user.rol == "medico") {
    if (user.id != userId) {
      return res.status(403).json({
        success: false,
        message: 'No puede realizar esta acción',
      });
    }
  }
  return next();
};
