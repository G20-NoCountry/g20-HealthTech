import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';

export async function isEqualUserLogin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;
  const id = parseInt(req.params.id);

  if (user.id != id) {
    return res.status(403).json({
      success: false,
      message: 'No puede realizar esta acción',
    });
  }
  return next();
};