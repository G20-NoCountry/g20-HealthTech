"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Change payload column from TEXT to JSON
    await queryInterface.changeColumn("notifications", "payload", {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the change
    await queryInterface.changeColumn("notifications", "payload", {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    });
  },
};
