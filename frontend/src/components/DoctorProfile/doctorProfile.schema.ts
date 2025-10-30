import { z } from 'zod';

export const personalDataSchema = z.object({
  first_name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  last_name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  license_num: z.number().min(1, 'La matrícula es obligatoria.'),
  speciality: z.string().min(1, 'La especialidad es obligatoria.'),
  // years_experience: z
  //   .string()
  //   .min(1, 'Debe ser un número positivo.')
  //   .max(2, 'Debe tener 2 dígitos como máximo.')
  //   .regex(/^\d+$/, 'Solo se aceptan números.'),
  phone: z
    .string()
    .min(7, 'Mínimo 7 dígitos.')
    .max(18, 'Máximo 18 dígitos.')
    .regex(
      /^\+?[\d\s()-]{6,18}$/,
      'Formato de teléfono no válido. Ejemplo: +54 9 11 5555-1234 o 2995339976',
    ),
  email: z.email('Debe ser un email válido.'),
});

export const academicFormationSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'El título es obligatorio.'),
  institution: z.string().min(1, 'La institución es obligatoria.'),
});

export const aboutMeSchema = z.object({
  description: z
    .string()
    .min(1, 'La descripción es obligatoria.')
    .max(280, 'La descripción no puede superar los 280 caracteres.'),
  areas_of_expertise: z
    .array(z.string())
    .min(1, 'Debes ingresar al menos 1 área.')
    .max(4, 'No puedes ingresar más de 4 áreas.')
    .refine((areas) => new Set(areas.map((a) => a.trim().toLowerCase())).size === areas.length, {
      message: 'No puedes repetir áreas de especialización.',
    }),
});

export const doctorProfileSchema = z.object({
  personal_data: personalDataSchema,
  academic_background: z
    .array(academicFormationSchema)
    .min(1, 'Debe tener al menos una formación.'),
  about_me: aboutMeSchema,
});

export type DoctorProfileFormData = z.infer<typeof doctorProfileSchema>;
