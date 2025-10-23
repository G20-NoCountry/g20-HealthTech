"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Change name column from STRING to ENUM
    await queryInterface.changeColumn("health_insurance", "name", {
      type: Sequelize.ENUM("OSDE", "UOM", "Otros", "etc"),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the change
    await queryInterface.changeColumn("health_insurance", "name", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
  },
};
