import { z } from 'zod';

const appointmentSchema = z.object({
  appointmentType: z.enum(['Presencial', 'Virtual']),
  specialityId: z.string().min(1, { message: 'Debe seleccionar una especialidad' }),
  doctorId: z.string().min(1, { message: 'Debe seleccionar un médico' }),
  date: z
    .date()
    .nullable()
    .refine((date) => date != null, { message: 'Debe seleccionar una fecha' }),
  time: z.string().min(1, { message: 'Debe seleccionar una hora' }),
});

export default appointmentSchema;
