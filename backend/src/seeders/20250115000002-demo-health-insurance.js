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
          name: "UOM",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Otros",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "etc",
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
