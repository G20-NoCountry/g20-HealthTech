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
          end_at: new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
          ),
          status: "completed",
          type: "in_person",
          location: "Consultorio 1, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: patients[1].id, // Roberto Silva
          medic_id: doctors[1].id, // Dr. Juan Rodríguez (Neurólogo)
          start_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
          end_at: new Date(
            now.getTime() - 5 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
          ),
          status: "completed",
          type: "virtual",
          location: null,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas programadas para mañana
        {
          patient_id: patients[2].id, // Carmen González
          medic_id: doctors[2].id, // Dra. Ana López (Pediatra)
          start_at: new Date(tomorrow.getTime() + 9 * 60 * 60 * 1000), // 9:00 AM
          end_at: new Date(tomorrow.getTime() + 10 * 60 * 60 * 1000), // 10:00 AM
          status: "scheduled",
          type: "in_person",
          location: "Consultorio 2, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: patients[3].id, // Diego Pérez
          medic_id: doctors[3].id, // Dr. Carlos Martínez (Oftalmólogo)
          start_at: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000), // 2:00 PM
          end_at: new Date(tomorrow.getTime() + 15 * 60 * 60 * 1000), // 3:00 PM
          status: "confirmed",
          type: "in_person",
          location: "Consultorio 3, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas programadas para la próxima semana
        {
          patient_id: patients[4].id, // Sofía Hernández
          medic_id: doctors[0].id, // Dr. María García (Cardióloga)
          start_at: new Date(nextWeek.getTime() + 10 * 60 * 60 * 1000), // 10:00 AM
          end_at: new Date(nextWeek.getTime() + 11 * 60 * 60 * 1000), // 11:00 AM
          status: "scheduled",
          type: "virtual",
          location: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: patients[5].id, // Miguel Torres
          medic_id: doctors[1].id, // Dr. Juan Rodríguez (Neurólogo)
          start_at: new Date(nextWeek.getTime() + 15 * 60 * 60 * 1000), // 3:00 PM
          end_at: new Date(nextWeek.getTime() + 16 * 60 * 60 * 1000), // 4:00 PM
          status: "scheduled",
          type: "in_person",
          location: "Consultorio 1, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas para el próximo mes
        {
          patient_id: patients[6].id, // Elena Vargas
          medic_id: doctors[2].id, // Dra. Ana López (Pediatra)
          start_at: new Date(nextMonth.getTime() + 11 * 60 * 60 * 1000), // 11:00 AM
          end_at: new Date(nextMonth.getTime() + 12 * 60 * 60 * 1000), // 12:00 PM
          status: "scheduled",
          type: "virtual",
          location: null,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas canceladas
        {
          patient_id: patients[0].id, // Laura Fernández
          medic_id: doctors[3].id, // Dr. Carlos Martínez (Oftalmólogo)
          start_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          end_at: new Date(
            now.getTime() - 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
          ),
          status: "cancelled",
          type: "in_person",
          location: "Consultorio 3, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Cita sin presentarse
        {
          patient_id: patients[1].id, // Roberto Silva
          medic_id: doctors[0].id, // Dr. María García (Cardióloga)
          start_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          end_at: new Date(
            now.getTime() - 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
          ),
          status: "no_show",
          type: "in_person",
          location: "Consultorio 1, Clínica Central",
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
