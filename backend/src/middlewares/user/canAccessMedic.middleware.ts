import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';

export async function canAccessMedic(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;

  if (user.rol !== "medico") {
      return res.status(403).json({
        success: false,
        message: 'No puede realizar esta acción',
      });
    
  }
  return next();
};
