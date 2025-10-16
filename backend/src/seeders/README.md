# Seeders para HealthTech

Este directorio contiene seeders para poblar la base de datos con datos de prueba para el sistema HealthTech.

## Archivos de Seeder

### Datos básicos
- `20250115000001-demo-roles.js` - Roles del sistema (admin, doctor, patient)
- `20250115000002-demo-health-insurance.js` - Obras sociales y seguros médicos

### Usuarios y perfiles
- `20250115000003-demo-users.js` - Usuarios del sistema (1 admin, 4 doctores, 7 pacientes)
- `20250115000004-demo-patients.js` - Datos específicos de pacientes
- `20250115000005-demo-medics.js` - Datos específicos de médicos con especialidades

### Citas y consultas
- `20250115000006-demo-appointments.js` - Citas médicas (pasadas, programadas, canceladas)
- `20250115000007-demo-medical-records.js` - Historiales médicos detallados
- `20250115000008-demo-teleconsultations.js` - Teleconsultas virtuales

### Notificaciones
- `20250115000009-demo-notifications.js` - Notificaciones del sistema

## Datos de Prueba Incluidos

### Usuarios
- **Admin**: admin@healthtech.com (password: password123)
- **Doctores**: 
  - Dr. María García (Cardióloga)
  - Dr. Juan Rodríguez (Neurólogo)
  - Dra. Ana López (Pediatra)
  - Dr. Carlos Martínez (Oftalmólogo)
- **Pacientes**: 7 pacientes con diferentes obras sociales

### Citas
- Citas completadas (historial)
- Citas programadas para mañana
- Citas para la próxima semana
- Citas canceladas y sin presentarse

### Historiales Médicos
- Consultas detalladas con diagnósticos y tratamientos
- Exámenes físicos y estudios solicitados
- Recomendaciones médicas

## Cómo Ejecutar los Seeders

### Opción 1: Script automatizado (Recomendado)
```bash
npm run seed:demo
```
Este script ejecuta todos los seeders en el orden correcto con información detallada.

### Opción 2: Ejecutar todos los seeders
```bash
npm run seed
```

### Opción 3: Ejecutar seeders específicos
```bash
npx sequelize-cli db:seed --seed 20250115000001-demo-roles.js
npx sequelize-cli db:seed --seed 20250115000002-demo-health-insurance.js
npx sequelize-cli db:seed --seed 20250115000003-demo-users.js
# ... y así sucesivamente
```

### Opción 4: Ejecutar desde un archivo específico
```bash
npx sequelize-cli db:seed --seed 20250115000003-demo-users.js
```

## Revertir Seeders

Para revertir un seeder específico:
```bash
npx sequelize-cli db:seed:undo --seed 20250115000003-demo-users.js
```

Para revertir todos los seeders:
```bash
npx sequelize-cli db:seed:undo:all
```

## Credenciales de Prueba

Todos los usuarios de prueba tienen la contraseña: `password123`

### Accesos principales:
- **Admin**: admin@healthtech.com
- **Doctor**: maria.garcia@healthtech.com
- **Paciente**: laura.fernandez@gmail.com

## Estructura de Datos

Los seeders respetan las relaciones entre tablas:
1. Primero se crean roles y obras sociales
2. Luego usuarios (con roles asignados)
3. Después perfiles específicos (pacientes/médicos)
4. Finalmente citas, historiales y notificaciones

## Notas Importantes

- Las contraseñas están hasheadas con bcrypt
- Las fechas de citas se generan dinámicamente basadas en la fecha actual
- Los IDs están hardcodeados para mantener las relaciones
- Los datos JSON en historiales médicos y notificaciones son realistas
