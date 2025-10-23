# Documentación de la API con Swagger

## Descripción

Este proyecto utiliza Swagger para documentar automáticamente la API REST. Swagger proporciona una interfaz interactiva que permite a los desarrolladores explorar y probar los endpoints de la API.

## Acceso a la Documentación

Una vez que el servidor esté ejecutándose, puedes acceder a la documentación de Swagger en:

- **Interfaz de Swagger UI**: `http://localhost:3000/api-docs`
- **Especificación JSON**: `http://localhost:3000/api-docs.json`

## Características Implementadas

### 1. Configuración Base
- ✅ Configuración de Swagger con OpenAPI 3.0.0
- ✅ Información del proyecto y contacto
- ✅ Configuración de servidores (desarrollo/producción)
- ✅ Esquemas de autenticación por sesiones

### 2. Endpoints Documentados
- ✅ **POST** `/api/auth/login` - Iniciar sesión
- ✅ **POST** `/api/auth/register/patient` - Registrar paciente
- ✅ **POST** `/api/auth/register/medic` - Registrar médico (solo admins)
- ✅ **GET** `/api/auth/user` - Obtener información del usuario
- ✅ **POST** `/api/auth/logout` - Cerrar sesión

### 3. Esquemas de Datos
- ✅ `User` - Información del usuario
- ✅ `LoginRequest` - Datos para inicio de sesión
- ✅ `RegisterPatientRequest` - Datos para registro de paciente
- ✅ `RegisterMedicRequest` - Datos para registro de médico
- ✅ `Success` - Respuesta exitosa estándar
- ✅ `Error` - Respuesta de error estándar

## Cómo Agregar Documentación a Nuevos Endpoints

### 1. Documentar una Nueva Ruta

Agrega comentarios de Swagger antes de tu ruta:

```typescript
/**
 * @swagger
 * /api/nuevo-endpoint:
 *   post:
 *     summary: Descripción breve del endpoint
 *     tags: [NombreDelTag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TuEsquema'
 *     responses:
 *       200:
 *         description: Descripción de la respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 */
router.post('/nuevo-endpoint', middleware, controller);
```

### 2. Agregar Nuevos Esquemas

En `src/config/swagger.config.ts`, agrega nuevos esquemas en la sección `components.schemas`:

```typescript
TuEsquema: {
  type: 'object',
  required: ['campo1', 'campo2'],
  properties: {
    campo1: {
      type: 'string',
      example: 'valor ejemplo'
    },
    campo2: {
      type: 'integer',
      example: 123
    }
  }
}
```

### 3. Agregar Nuevos Tags

Para organizar mejor los endpoints, puedes agregar nuevos tags:

```typescript
/**
 * @swagger
 * tags:
 *   name: TuNuevoTag
 *   description: Descripción del grupo de endpoints
 */
```

## Autenticación en Swagger

El proyecto utiliza autenticación basada en sesiones. Para probar endpoints protegidos en Swagger UI:

1. Primero autentícate usando el endpoint `/api/auth/login`
2. Los cookies de sesión se manejarán automáticamente
3. Los endpoints protegidos funcionarán en las pruebas de Swagger UI

## Comandos Útiles

```bash
# Instalar dependencias de Swagger
npm install swagger-jsdoc swagger-ui-express

# Ejecutar el servidor en modo desarrollo
npm run dev

# Construir el proyecto
npm run build
```

## Estructura de Archivos

```
src/
├── config/
│   └── swagger.config.ts     # Configuración principal de Swagger
├── routes/
│   └── auth.routes.ts        # Rutas documentadas con Swagger
└── app.ts                    # Integración de Swagger en Express
```

## Personalización

### Cambiar la URL de Documentación

Para cambiar la ruta de acceso a la documentación, modifica en `src/app.ts`:

```typescript
app.use('/tu-nueva-ruta', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

### Personalizar la Interfaz

Puedes personalizar la interfaz de Swagger UI modificando las opciones en `src/app.ts`:

```typescript
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Tu Título Personalizado'
}));
```

## Notas Importantes

- Los comentarios de Swagger deben estar inmediatamente antes de las rutas que documentan
- La configuración de Swagger se encuentra en `src/config/swagger.config.ts`
- Los esquemas de datos se definen en la configuración y se referencian con `$ref`
- La documentación se actualiza automáticamente cuando cambias los comentarios
