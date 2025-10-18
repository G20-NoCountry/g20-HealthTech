import { Request, Response, NextFunction } from 'express';

export function isNotAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isUnauthenticated()) {    
    return next();
  }

  return res.status(409).json({
    success: false,
    message: 'Ya existe una sesión activa',
  });
}
