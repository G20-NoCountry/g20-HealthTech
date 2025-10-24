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
      UpdateMedicRequest: {
        type: "object",
        properties: {
          first_name: {
            type: "string",
            example: "Dr. María",
          },
          last_name: {
            type: "string",
            example: "González",
          },
          email: {
            type: "string",
            format: "email",
            example: "medico_mod@ejemplo.com",
          },
          phone: {
            type: "string",
            example: "+5491122334455",
          },
          licence_num: {
            type: "integer",
            example: 123456,
          },
        },
      },
      UpdatePatientRequest: {
        type: "object",
        properties: {
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
            example: "paciente_mod@ejemplo.com",
          },
          phone: {
            type: "string",
            example: "+5491122334455",
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
