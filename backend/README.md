# Configuración de la base de datos con Sequelize

Este documento explica cómo configurar y utilizar la base de datos con Sequelize ORM en el backend de HealthTech.

## Requisitos previos

1. **Servidor MySQL**: Asegúrese de que MySQL está instalado y en ejecución en su sistema
2. **Node.js**: Versión 18 o superior
3. **npm**: Gestor de paquetes

## Configuración del entorno

El fichero `.env` ha sido creado con la siguiente configuración:

``env
# Configuración de la aplicación
APP_PORT=3000
NODE_ENV=desarrollo

# Configuración de la base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=base_de_datos_salud
DB_USERNAME=root
DB_PASSWORD=
DB_DIALECT=mysql
DB_LOGGING=false

# Configuración JWT (para futura autenticación)
JWT_SECRET=su_clave_jwt_secreta_aquí
JWT_EXPIRES_IN=24h

# URL frontend (para CORS)
FRONTEND_URL=http://localhost:5173
```

**Importante**: Actualice el `DB_PASSWORD` en el archivo `.env` con su contraseña raíz de MySQL.

## Pasos para configurar la base de datos

### 1. 1. Crear la base de datos

En primer lugar, cree la base de datos en MySQL:

``sql
CREAR BASE DE DATOS healthtech_db;
```

O utiliza la CLI de Sequelize:

``bash
npm run db:create
```

### 2. Ejecutar migraciones

Ejecuta las migraciones para crear todas las tablas:

```bash
npm run db:migrate
```

### 3. Sembrar datos iniciales (opcional)

Sembrar la base de datos con los roles iniciales y los datos del seguro médico:

```bash
npm run db:seed
```

## Scripts disponibles

- `npm run db:migrate` - Ejecuta todas las migraciones pendientes
- `npm run db:migrate:undo` - Deshace la última migración
- `npm run db:migrate:undo:all` - Deshace todas las migraciones
- `npm run db:seed` - Ejecutar todos los sembradores
- `npm run db:seed:undo` - Deshacer todos los sembradores
- `npm run db:create` - Crear la base de datos
- `npm run db:drop` - Eliminar la base de datos

## Esquema de la base de datos

Se crean las siguientes tablas:

1. **roles** - Roles de usuario (admin, doctor, paciente)
2. **users** - Tabla principal de usuarios con información de autenticación
3. **health_insurance** - Proveedores de seguros de salud
4. **patients** - Información específica del paciente
5. **medic** - Información específica del médico
6. **citas** - Citas médicas
7. **medical_records** - Historial médico del paciente
8. **teleconsultations** - Consultas virtuales
9. **notifications** - Notificaciones del sistema

## Relaciones entre modelos

- Los usuarios pertenecen a un rol
- Los pacientes y los médicos amplían la información de los usuarios
- Los pacientes pertenecen a un seguro médico
- Las citas vinculan a pacientes y médicos (usuarios)
- Los historiales médicos vinculan a pacientes y médicos
- Las teleconsultas pertenecen a las citas
- Las notificaciones pertenecen a Usuarios y opcionalmente a Citas

## Importante!

`medical_records.content` tiene tipo de dato `TEXT('long')` originalmente erá `JSON`, lo mismo para `notifications.payload`.
Cuando trabajen con estos datos , simplemente usen JSON.parse() para convertir las cadenas de vuelta a objetos JavaScript.

## Desarrollo

Cuando se ejecuta en modo desarrollo (`NODE_ENV=development`), la base de datos sincronizará automáticamente los modelos con el esquema de la base de datos. Esto es útil para el desarrollo, pero no debe utilizarse en producción.

## Consideraciones de producción

1. Establezca `NODE_ENV=production` en su entorno.
2. Use migraciones en lugar de `sync()` para cambios de esquema
3. Configure las credenciales adecuadas de la base de datos
4. Configurar copias de seguridad de la base de datos
5. 5. Utilizar la agrupación de conexiones para mejorar el rendimiento

## Solución de problemas

### Problemas de conexión
- Compruebe que MySQL se está ejecutando
- Compruebe las credenciales de la base de datos en `.env
- Asegúrese de que la base de datos existe
- Compruebe la configuración del cortafuegos

### Problemas de migración
- Compruebe que se han ejecutado todas las migraciones anteriores
- Compruebe si hay errores de sintaxis en los archivos de migración
- Compruebe las restricciones de clave externa

### Problemas de modelo
- Comprobar que las asociaciones del modelo están correctamente definidas
- Comprobar que los tipos de datos coinciden con el esquema de la base de datos
- Comprobar que las importaciones en los archivos de modelo son correctas
