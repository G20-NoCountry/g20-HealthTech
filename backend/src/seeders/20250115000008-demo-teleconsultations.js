"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "teleconsultations",
      [
        {
          appointment_id: 2, // Cita virtual de Roberto Silva con Dr. Juan Rodríguez
          session_url: "https://meet.healthtech.com/neuro-001",
          status: "ended",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          appointment_id: 5, // Cita virtual de Sofía Hernández con Dr. María García
          session_url: "https://meet.healthtech.com/cardio-002",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          appointment_id: 7, // Cita virtual de Elena Vargas con Dra. Ana López
          session_url: "https://meet.healthtech.com/pediatria-001",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("teleconsultations", null, {});
  },
};
