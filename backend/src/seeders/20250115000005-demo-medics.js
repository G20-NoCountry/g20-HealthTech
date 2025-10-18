"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "medic",
      [
        {
          id: 2, // Dr. María García
          speciality: "cardiologia",
          license_num: 12345,
          schedule_from: new Date(),
          schedule_to: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3, // Dr. Juan Rodríguez
          speciality: "neurologia",
          license_num: 12346,
          schedule_from: new Date(),
          schedule_to: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4, // Dra. Ana López
          speciality: "pediatria",
          license_num: 12347,
          schedule_from: new Date(),
          schedule_to: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5, // Dr. Carlos Martínez
          speciality: "oftalmologia",
          license_num: 12348,
          schedule_from: new Date(),
          schedule_to: new Date(),
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
