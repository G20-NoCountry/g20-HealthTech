import { Request, Response, NextFunction } from 'express';
import { Role, User } from '../../models';

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;
  const adminRoleId = await Role.findOne({ where: { rol: "admin" }, attributes: ["id"] });
  if (adminRoleId) {
    if (user.role_id != adminRoleId.id) {
      return res.status(403).json({
        success: false,
        message: 'No puede realizar esta acción',
      });
    }
  }

  return next();
}
