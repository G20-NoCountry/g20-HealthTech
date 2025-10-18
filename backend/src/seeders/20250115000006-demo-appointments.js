"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    await queryInterface.bulkInsert(
      "appointments",
      [
        // Citas pasadas (completadas)
        {
          patient_id: 6, // Laura Fernández
          doctor_id: 2, // Dr. María García (Cardióloga)
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
          patient_id: 7, // Roberto Silva
          doctor_id: 3, // Dr. Juan Rodríguez (Neurólogo)
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
          patient_id: 8, // Carmen González
          doctor_id: 4, // Dra. Ana López (Pediatra)
          start_at: new Date(tomorrow.getTime() + 9 * 60 * 60 * 1000), // 9:00 AM
          end_at: new Date(tomorrow.getTime() + 10 * 60 * 60 * 1000), // 10:00 AM
          status: "scheduled",
          type: "in_person",
          location: "Consultorio 2, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: 9, // Diego Pérez
          doctor_id: 5, // Dr. Carlos Martínez (Oftalmólogo)
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
          patient_id: 10, // Sofía Hernández
          doctor_id: 2, // Dr. María García (Cardióloga)
          start_at: new Date(nextWeek.getTime() + 10 * 60 * 60 * 1000), // 10:00 AM
          end_at: new Date(nextWeek.getTime() + 11 * 60 * 60 * 1000), // 11:00 AM
          status: "scheduled",
          type: "virtual",
          location: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: 11, // Miguel Torres
          doctor_id: 3, // Dr. Juan Rodríguez (Neurólogo)
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
          patient_id: 12, // Elena Vargas
          doctor_id: 4, // Dra. Ana López (Pediatra)
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
          patient_id: 6, // Laura Fernández
          doctor_id: 5, // Dr. Carlos Martínez (Oftalmólogo)
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
          patient_id: 7, // Roberto Silva
          doctor_id: 2, // Dr. María García (Cardióloga)
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
