"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "medic",
      [
        {
          id: 2, // Dr. María García
          specialty: "cardiologia",
          licence_num: 12345,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3, // Dr. Juan Rodríguez
          specialty: "neurologia",
          licence_num: 12346,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4, // Dra. Ana López
          specialty: "pediatria",
          licence_num: 12347,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5, // Dr. Carlos Martínez
          specialty: "oftamologia",
          licence_num: 12348,
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
