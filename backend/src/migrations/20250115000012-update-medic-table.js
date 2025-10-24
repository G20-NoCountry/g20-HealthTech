"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove old columns and add new ones
    await queryInterface.removeColumn("medic", "speciality");
    await queryInterface.removeColumn("medic", "license_num");
    await queryInterface.removeColumn("medic", "schedule_to");

    // Add new columns
    await queryInterface.addColumn("medic", "specialty", {
      type: Sequelize.ENUM("oftamologia", "etc"),
      allowNull: false,
    });

    await queryInterface.addColumn("medic", "licence_num", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn("medic", "schedule_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the changes
    await queryInterface.removeColumn("medic", "schedule_at");
    await queryInterface.removeColumn("medic", "licence_num");
    await queryInterface.removeColumn("medic", "specialty");

    // Restore old columns
    await queryInterface.addColumn("medic", "schedule_to", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn("medic", "license_num", {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn("medic", "speciality", {
      type: Sequelize.ENUM(
        "oftalmologia",
        "cardiologia",
        "neurologia",
        "dermatologia",
        "pediatria",
        "ginecologia",
        "traumatologia",
        "psiquiatria",
        "medicina_general"
      ),
      allowNull: false,
    });
  },
};
