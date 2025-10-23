"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove old columns and add new ones
    await queryInterface.removeColumn("appointments", "end_at");
    await queryInterface.removeColumn("appointments", "status");

    // Add new columns
    await queryInterface.addColumn("appointments", "symptoms", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.addColumn("appointments", "diagnostic", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the changes
    await queryInterface.removeColumn("appointments", "diagnostic");
    await queryInterface.removeColumn("appointments", "symptoms");

    // Restore old columns
    await queryInterface.addColumn("appointments", "status", {
      type: Sequelize.ENUM(
        "scheduled",
        "confirmed",
        "completed",
        "cancelled",
        "no_show"
      ),
      allowNull: false,
      defaultValue: "scheduled",
    });

    await queryInterface.addColumn("appointments", "end_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
