"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener los IDs de los usuarios médicos
    const [users] = await queryInterface.sequelize.query(
      "SELECT id, email FROM users WHERE rol = 'medico' ORDER BY id"
    );

    await queryInterface.bulkInsert(
      "medic",
      [
        {
          id: users[0].id, // Dr. María García
          speciality: "oftalmologia",
          license_num: 12345,
          schedule_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: users[1].id, // Dr. Juan Rodríguez
          speciality: "cardiologia",
          license_num: 12346,
          schedule_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: users[2].id, // Dra. Ana López
          speciality: "pediatria",
          license_num: 12347,
          schedule_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: users[3].id, // Dr. Carlos Martínez
          speciality: "oftalmologia",
          license_num: 12348,
          schedule_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("medic", null, {});
  },
};
