"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Obtener los IDs de usuarios
    const [patients] = await queryInterface.sequelize.query(
      "SELECT id, email FROM users WHERE rol = 'paciente' ORDER BY id"
    );
    const [doctors] = await queryInterface.sequelize.query(
      "SELECT id, email FROM users WHERE rol = 'medico' ORDER BY id"
    );

    await queryInterface.bulkInsert(
      "appointments",
      [
        // Citas pasadas (completadas)
        {
          patient_id: patients[0].id, // Laura Fernández
          medic_id: doctors[0].id, // Dr. María García (Cardióloga)
          start_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          end_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // +30 min
          type: "in_person",
          symptoms: "Dolor en el pecho intermitente",
          diagnostic: "Hipertensión arterial leve",
          location: "Consultorio 1, Clínica Central",
          status: "completed",
          deleted_at: null,
          cancellation_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: patients[1].id, // Roberto Silva
          medic_id: doctors[1].id, // Dr. Juan Rodríguez (Neurólogo)
          start_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
          end_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000), // +45 min
          type: "virtual",
          symptoms: "Dolores de cabeza frecuentes",
          diagnostic: "Migraña sin aura",
          location: null,
          status: "completed",
          deleted_at: null,
          cancellation_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas programadas para mañana
        {
          patient_id: patients[2].id, // Carmen González
          medic_id: doctors[2].id, // Dra. Ana López (Pediatra)
          start_at: new Date(tomorrow.getTime() + 9 * 60 * 60 * 1000), // 9:00 AM
          end_at: new Date(tomorrow.getTime() + 9 * 60 * 60 * 1000 + 30 * 60 * 1000), // +30 min
          type: "in_person",
          symptoms: "Control de crecimiento",
          diagnostic: "Desarrollo normal",
          location: "Consultorio 2, Clínica Central",
          status: "scheduled",
          deleted_at: null,
          cancellation_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: patients[3].id, // Diego Pérez
          medic_id: doctors[3].id, // Dr. Carlos Martínez (Oftalmólogo)
          start_at: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000), // 2:00 PM
          end_at: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000 + 60 * 60 * 1000), // +60 min
          type: "in_person",
          symptoms: "Dificultad para ver de lejos",
          diagnostic: "Miopía leve",
          location: "Consultorio 3, Clínica Central",
          status: "scheduled",
          deleted_at: null,
          cancellation_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas programadas para la próxima semana
        {
          patient_id: patients[4].id, // Sofía Hernández
          medic_id: doctors[0].id, // Dr. María García (Cardióloga)
          start_at: new Date(nextWeek.getTime() + 10 * 60 * 60 * 1000), // 10:00 AM
          end_at: new Date(nextWeek.getTime() + 10 * 60 * 60 * 1000 + 30 * 60 * 1000), // +30 min
          type: "virtual",
          symptoms: "Seguimiento de hipertensión",
          diagnostic: "Hipertensión controlada",
          location: null,
          status: "scheduled",
          deleted_at: null,
          cancellation_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: patients[5].id, // Miguel Torres
          medic_id: doctors[1].id, // Dr. Juan Rodríguez (Neurólogo)
          start_at: new Date(nextWeek.getTime() + 15 * 60 * 60 * 1000), // 3:00 PM
          end_at: new Date(nextWeek.getTime() + 15 * 60 * 60 * 1000 + 45 * 60 * 1000), // +45 min
          type: "in_person",
          symptoms: "Consulta general",
          diagnostic: "Sin patología",
          location: "Consultorio 1, Clínica Central",
          status: "scheduled",
          deleted_at: null,
          cancellation_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas para el próximo mes
        {
          patient_id: patients[6].id, // Elena Vargas
          medic_id: doctors[2].id, // Dra. Ana López (Pediatra)
          start_at: new Date(nextMonth.getTime() + 11 * 60 * 60 * 1000), // 11:00 AM
          end_at: new Date(nextMonth.getTime() + 11 * 60 * 60 * 1000 + 30 * 60 * 1000), // +30 min
          type: "virtual",
          symptoms: "Control pediátrico",
          diagnostic: "Desarrollo normal",
          location: null,
          status: "scheduled",
          deleted_at: null,
          cancellation_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas canceladas
        {
          patient_id: patients[0].id, // Laura Fernández
          medic_id: doctors[3].id, // Dr. Carlos Martínez (Oftalmólogo)
          start_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          end_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // +60 min
          type: "in_person",
          symptoms: "Consulta oftalmológica",
          diagnostic: "Sin patología",
          location: "Consultorio 3, Clínica Central",
          status: "cancelled",
          deleted_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // Cancelada hace 2 días
          cancellation_reason: "Paciente no pudo asistir por emergencia familiar",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Cita sin presentarse
        {
          patient_id: patients[1].id, // Roberto Silva
          medic_id: doctors[0].id, // Dr. María García (Cardióloga)
          start_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          end_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // +30 min
          type: "in_person",
          symptoms: "Consulta cardiológica",
          diagnostic: "Sin patología",
          location: "Consultorio 1, Clínica Central",
          status: "no_show",
          deleted_at: null,
          cancellation_reason: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("appointments", null, {});
  },
};
