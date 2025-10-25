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
      Patient: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          health_insurance: {
            type: "string",
            enum: [
              "OSECAC",
              "OSPRERA",
              "UPCN",
              "OBSBA",
              "OSDEPYM",
              "OSUTHGRA",
              "OSPE",
              "OSPECON",
              "OSIAD",
              "OSSEG",
            ],
            example: "OSECAC",
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
      Medic: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
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
      MedicalRecord: {
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
          doctor_id: {
            type: "integer",
            example: 2,
          },
          record_type: {
            type: "string",
            example: "Consulta general",
          },
          content: {
            type: "string",
            example: "Paciente presenta síntomas de gripe común...",
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
      Teleconsultation: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          appointment_id: {
            type: "integer",
            example: 1,
          },
          session_url: {
            type: "string",
            example: "https://meet.example.com/session123",
          },
          status: {
            type: "string",
            enum: ["pending", "started", "ended"],
            example: "pending",
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
      Notification: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          user_id: {
            type: "integer",
            example: 1,
          },
          appointment_id: {
            type: "integer",
            example: 1,
          },
          type: {
            type: "string",
            enum: ["email", "sms"],
            example: "email",
          },
          status: {
            type: "string",
            enum: ["queued", "sent", "failed"],
            example: "queued",
          },
          payload: {
            type: "object",
            example: {
              subject: "Recordatorio de cita",
              message: "Tienes una cita mañana a las 10:00 AM",
            },
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
          "health_insurance",
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
          health_insurance: {
            type: "string",
            enum: [
              "OSECAC",
              "OSPRERA",
              "UPCN",
              "OBSBA",
              "OSDEPYM",
              "OSUTHGRA",
              "OSPE",
              "OSPECON",
              "OSIAD",
              "OSSEG",
            ],
            example: "OSECAC",
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
            example: "María modificado",
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
          health_insurance: {
            enum: [
              "OSECAC",
              "OSPRERA",
              "UPCN",
              "OBSBA",
              "OSDEPYM",
              "OSUTHGRA",
              "OSPE",
              "OSPECON",
              "OSIAD",
              "OSSEG",
            ],
            example: "OSECAC",
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
          }
        }
      },
      FullPatient: {
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
          health_insurance: {
            type: "string",
            enum: [
              "OSECAC",
              "OSPRERA",
              "UPCN",
              "OBSBA",
              "OSDEPYM",
              "OSUTHGRA",
              "OSPE",
              "OSPECON",
              "OSIAD",
              "OSSEG",
            ],
            example: "OSECAC",
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
          }
        },
      },
      FullMedic: {
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
      Unauthorized: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "La sesión no es válida o ha expirado",
          }
        }
      },
      Forbidden: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "No puede realizar esta acción",
          }
        }
      },
      Authenticated: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Ya existe una sesión activa",
          }
        }
      },
      BadRequest: {
        type: "object",
        properties: {
          errors: {
            type: "array",
            description: "Listado de errores de validación",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  example: "field",
                },
                value: {
                  type: "string",
                  example: "@healthtech.com",
                },
                msg: {
                  type: "string",
                  example: "email no válido",
                },
                path: {
                  type: "string",
                  example: "email",
                },
                location: {
                  type: "string",
                  example: "body",
                },
              },
            },
          }
        }
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
        required: ["start_at", "type"],
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
      CreateMedicalRecordRequest: {
        type: "object",
        required: ["patient_id", "record_type", "content"],
        properties: {
          patient_id: {
            type: "integer",
            example: 1,
            description: "ID del paciente",
          },
          record_type: {
            type: "string",
            example: "Consulta general",
            description: "Tipo de registro médico",
          },
          content: {
            type: "string",
            example: "Paciente presenta síntomas de gripe común...",
            description: "Contenido del registro médico",
          },
        },
      },
      CreateTeleconsultationRequest: {
        type: "object",
        required: ["appointment_id", "session_url"],
        properties: {
          appointment_id: {
            type: "integer",
            example: 1,
            description: "ID de la cita",
          },
          session_url: {
            type: "string",
            example: "https://meet.example.com/session123",
            description: "URL de la sesión de teleconsulta",
          },
        },
      },
      CreateNotificationRequest: {
        type: "object",
        required: ["user_id", "type", "payload"],
        properties: {
          user_id: {
            type: "integer",
            example: 1,
            description: "ID del usuario",
          },
          appointment_id: {
            type: "integer",
            example: 1,
            description: "ID de la cita (opcional)",
          },
          type: {
            type: "string",
            enum: ["email", "sms"],
            example: "email",
            description: "Tipo de notificación",
          },
          payload: {
            type: "object",
            example: {
              subject: "Recordatorio de cita",
              message: "Tienes una cita mañana a las 10:00 AM",
            },
            description: "Datos de la notificación",
          },
        },
      },
      UserWithDetails: {
        type: "object",
        properties: {
          user: {
            $ref: "#/components/schemas/User",
          },
          patient: {
            $ref: "#/components/schemas/Patient",
          },
          medic: {
            $ref: "#/components/schemas/Medic",
          },
        },
      },
      AppointmentWithDetails: {
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
          doctor_id: {
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
          patient: {
            $ref: "#/components/schemas/User",
          },
          doctor: {
            $ref: "#/components/schemas/User",
          },
          teleconsultation: {
            $ref: "#/components/schemas/Teleconsultation",
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
