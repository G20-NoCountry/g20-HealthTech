import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "HealthTech API",
    version: "1.0.0",
    description: "API para el sistema de gestión de salud digital",
    contact: {
      name: "HealthTech Team",
      email: "support@healthtech.com",
    },
  },
  servers: [
    {
      url:
        process.env.NODE_ENV === "production"
          ? "https://api.healthtech.com"
          : `http://localhost:${process.env.PORT || 3000}`,
      description:
        process.env.NODE_ENV === "production"
          ? "Servidor de producción"
          : "Servidor de desarrollo",
    },
  ],
  components: {
    securitySchemes: {
      sessionAuth: {
        type: "apiKey",
        in: "cookie",
        name: "connect.sid",
        description: "Autenticación basada en sesiones",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Mensaje de error",
          },
          data: {
            type: "null",
            example: null,
          },
        },
      },
      Success: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: "Operación exitosa",
          },
          data: {
            type: "object",
            example: {},
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          rol: {
            type: "string",
            enum: ["medico", "paciente"],
            example: "paciente",
          },
          first_name: {
            type: "string",
            example: "Juan",
          },
          last_name: {
            type: "string",
            example: "Pérez",
          },
          email: {
            type: "string",
            format: "email",
            example: "usuario@ejemplo.com",
          },
          phone: {
            type: "string",
            example: "+1234567890",
          },
          is_active: {
            type: "boolean",
            example: true,
          },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "usuario@ejemplo.com",
          },
          password: {
            type: "string",
            minLength: 6,
            example: "password123",
          },
        },
      },
      RegisterPatientRequest: {
        type: "object",
        required: [
          "email",
          "password",
          "first_name",
          "last_name",
          "phone",
          "id_health_insurance",
          "blood_type",
          "alergias",
          "cronicas_condition",
          "actual_medication",
          "location",
        ],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "paciente@ejemplo.com",
          },
          password: {
            type: "string",
            minLength: 6,
            example: "password123",
          },
          first_name: {
            type: "string",
            example: "Juan",
          },
          last_name: {
            type: "string",
            example: "Pérez",
          },
          phone: {
            type: "string",
            example: "+1234567890",
          },
          id_health_insurance: {
            type: "integer",
            example: 1,
          },
          blood_type: {
            type: "string",
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            example: "A+",
          },
          alergias: {
            type: "string",
            example: "Ninguna",
          },
          cronicas_condition: {
            type: "string",
            example: "Ninguna",
          },
          actual_medication: {
            type: "string",
            example: "Ninguna",
          },
          location: {
            type: "string",
            example: "Buenos Aires, Argentina",
          },
        },
      },
      RegisterMedicRequest: {
        type: "object",
        required: [
          "email",
          "password",
          "first_name",
          "last_name",
          "phone",
          "specialty",
          "licence_num",
          "schedule_from",
          "schedule_at",
        ],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "medico@ejemplo.com",
          },
          password: {
            type: "string",
            minLength: 6,
            example: "password123",
          },
          first_name: {
            type: "string",
            example: "Dr. María",
          },
          last_name: {
            type: "string",
            example: "González",
          },
          phone: {
            type: "string",
            example: "+1234567890",
          },
          specialty: {
            type: "string",
            enum: ["oftamologia", "etc"],
            example: "oftamologia",
          },
          licence_num: {
            type: "integer",
            example: 123456,
          },
          schedule_from: {
            type: "string",
            format: "date-time",
            example: "2024-01-01T09:00:00Z",
          },
          schedule_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-01T17:00:00Z",
          },
        },
      },
      Appointment: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          patient_id: {
            type: "integer",
            example: 1,
          },
          medic_id: {
            type: "integer",
            example: 2,
          },
          start_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:00:00Z",
          },
          end_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T11:00:00Z",
          },
          symptoms: {
            type: "string",
            example: "Dolor de cabeza y fiebre",
          },
          diagnostic: {
            type: "string",
            example: "Gripe común",
          },
          type: {
            type: "string",
            enum: ["in_person", "virtual"],
            example: "in_person",
          },
          location: {
            type: "string",
            example: "Consultorio 1",
          },
          created_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-01T00:00:00Z",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-01T00:00:00Z",
          },
        },
      },
      CreateAppointmentRequest: {
        type: "object",
        required: ["start_at", "end_at", "type"],
        properties: {
          patient_id: {
            type: "integer",
            example: 1,
            description: "ID del paciente (opcional si se infiere del JWT)",
          },
          medic_id: {
            type: "integer",
            example: 2,
            description: "ID del médico (opcional si se infiere del JWT)",
          },
          start_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:00:00Z",
            description: "Fecha y hora de inicio de la cita",
          },
          end_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T11:00:00Z",
            description: "Fecha y hora de fin de la cita",
          },
          type: {
            type: "string",
            enum: ["in_person", "virtual"],
            example: "in_person",
            description: "Tipo de cita",
          },
          location: {
            type: "string",
            example: "Consultorio 1",
            description: "Ubicación de la cita (opcional)",
          },
          symptoms: {
            type: "string",
            example: "Dolor de cabeza",
            description: "Síntomas del paciente (opcional)",
          },
        },
      },
      UpdateAppointmentRequest: {
        type: "object",
        properties: {
          start_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:00:00Z",
            description: "Fecha y hora de inicio de la cita",
          },
          end_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T11:00:00Z",
            description: "Fecha y hora de fin de la cita",
          },
          type: {
            type: "string",
            enum: ["in_person", "virtual"],
            example: "virtual",
            description: "Tipo de cita",
          },
          location: {
            type: "string",
            example: "Consultorio 2",
            description: "Ubicación de la cita",
          },
          symptoms: {
            type: "string",
            example: "Dolor de cabeza y fiebre",
            description: "Síntomas del paciente",
          },
          diagnostic: {
            type: "string",
            example: "Gripe común",
            description: "Diagnóstico (solo para médicos)",
          },
        },
      },
    },
  },
  security: [
    {
      sessionAuth: [],
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
