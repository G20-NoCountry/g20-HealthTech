"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the role_id column and add rol enum column
    await queryInterface.removeColumn("users", "role_id");

    await queryInterface.addColumn("users", "rol", {
      type: Sequelize.ENUM("medico", "paciente"),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the changes
    await queryInterface.removeColumn("users", "rol");

    await queryInterface.addColumn("users", "role_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    });
  },
};
