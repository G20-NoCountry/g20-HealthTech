"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "health_insurance",
      [
        {
          name: "OSDE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Swiss Medical",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Galeno",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Medicus",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sin seguro",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("health_insurance", null, {});
  },
};
