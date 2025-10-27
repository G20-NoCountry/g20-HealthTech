import { Request, Response, NextFunction } from 'express';
import { Appointment, User } from '../../models';

export async function canUpdateMedic(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  const user = await User.findOne({ where: { id: userId } });

  if (user) {
    const appointments = await Appointment.findAll({ where: { medic_id: user.id } });
    if (appointments.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'No se puede actualizar un medico con citas agendadas',
      });
    }
    return next();
  }
};
