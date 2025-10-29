import { z } from 'zod';
const appointmentSchema = z.object({
  date: z
    .date()
    .nullable()
    .refine((date) => date != null, { message: 'Debe seleccionar una fecha' }),
  time: z.string().min(1, { message: 'Debe seleccionar una hora' }),
});
export default appointmentSchema;
