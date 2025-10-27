"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener las citas virtuales
    const [virtualAppointments] = await queryInterface.sequelize.query(
      "SELECT id FROM appointments WHERE type = 'virtual' ORDER BY id"
    );

    await queryInterface.bulkInsert(
      "teleconsultations",
      [
        {
          appointment_id: virtualAppointments[0].id, // Primera cita virtual
          session_url: "https://meet.healthtech.com/neuro-001",
          status: "ended",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          appointment_id: virtualAppointments[1].id, // Segunda cita virtual
          session_url: "https://meet.healthtech.com/cardio-002",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          appointment_id: virtualAppointments[2].id, // Tercera cita virtual
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
