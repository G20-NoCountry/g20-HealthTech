"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener los IDs de usuarios y citas
    const [users] = await queryInterface.sequelize.query(
      "SELECT id, email FROM users ORDER BY id"
    );
    const [appointments] = await queryInterface.sequelize.query(
      "SELECT id FROM appointments ORDER BY id"
    );

    await queryInterface.bulkInsert(
      "notifications",
      [
        // Notificaciones de confirmación de citas
        {
          user_id: users[2].id, // Carmen González
          appointment_id: appointments[2].id, // Su cita de mañana
          type: "email",
          status: "sent",
          payload: JSON.stringify({
            subject: "Confirmación de cita médica",
            message:
              "Su cita con la Dra. Ana López está confirmada para mañana a las 9:00 AM en Consultorio 2.",
            appointment_date: "2025-01-16",
            appointment_time: "09:00",
            doctor_name: "Dra. Ana López",
            location: "Consultorio 2, Clínica Central",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: users[3].id, // Diego Pérez
          appointment_id: appointments[3].id, // Su cita de mañana
          type: "sms",
          status: "sent",
          payload: JSON.stringify({
            message:
              "Recordatorio: Su cita con Dr. Carlos Martínez es mañana a las 14:00 en Consultorio 3.",
            appointment_date: "2025-01-16",
            appointment_time: "14:00",
            doctor_name: "Dr. Carlos Martínez",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Notificaciones de recordatorios
        {
          user_id: users[4].id, // Sofía Hernández
          appointment_id: appointments[4].id, // Su cita de la próxima semana
          type: "email",
          status: "queued",
          payload: JSON.stringify({
            subject: "Recordatorio de cita médica",
            message:
              "Le recordamos que tiene una cita con Dr. María García la próxima semana.",
            appointment_date: "2025-01-22",
            appointment_time: "10:00",
            doctor_name: "Dr. María García",
            type: "virtual",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: users[5].id, // Miguel Torres
          appointment_id: appointments[5].id, // Su cita de la próxima semana
          type: "sms",
          status: "queued",
          payload: JSON.stringify({
            message:
              "Recordatorio: Cita con Dr. Juan Rodríguez el 22/01 a las 15:00.",
            appointment_date: "2025-01-22",
            appointment_time: "15:00",
            doctor_name: "Dr. Juan Rodríguez",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Notificaciones de resultados
        {
          user_id: users[0].id, // Laura Fernández
          appointment_id: appointments[0].id, // Su cita completada
          type: "email",
          status: "sent",
          payload: JSON.stringify({
            subject: "Resultados de su consulta médica",
            message:
              "Los resultados de su consulta cardiológica están disponibles. Por favor revise su historial médico.",
            appointment_date: "2025-01-08",
            doctor_name: "Dr. María García",
            record_type: "consulta_cardiológica",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Notificaciones de cancelación
        {
          user_id: users[0].id, // Laura Fernández
          appointment_id: appointments[7].id, // Su cita cancelada
          type: "email",
          status: "sent",
          payload: JSON.stringify({
            subject: "Cita médica cancelada",
            message:
              "Su cita con Dr. Carlos Martínez ha sido cancelada. Puede reagendar desde su panel de usuario.",
            appointment_date: "2025-01-12",
            appointment_time: "10:00",
            doctor_name: "Dr. Carlos Martínez",
            cancellation_reason: "Cancelación por parte del paciente",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Notificaciones generales del sistema
        {
          user_id: users[1].id, // Roberto Silva
          type: "email",
          status: "sent",
          payload: JSON.stringify({
            subject: "Bienvenido a HealthTech",
            message:
              "Gracias por registrarse en nuestra plataforma. Aquí podrá gestionar sus citas médicas de forma sencilla.",
            welcome: true,
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: users[6].id, // Elena Vargas
          type: "email",
          status: "queued",
          payload: JSON.stringify({
            subject: "Actualización de política de privacidad",
            message:
              "Hemos actualizado nuestra política de privacidad. Por favor revise los cambios en nuestro sitio web.",
            system_notification: true,
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Notificaciones fallidas
        {
          user_id: users[2].id, // Carmen González
          appointment_id: appointments[2].id,
          type: "sms",
          status: "failed",
          payload: JSON.stringify({
            message: "Error al enviar SMS de confirmación",
            error: "Número de teléfono inválido",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("notifications", null, {});
  },
};
