"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          rol: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          rol: "doctor",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          rol: "patient",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
