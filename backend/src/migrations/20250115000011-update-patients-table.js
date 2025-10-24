"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add new columns to patients table
    await queryInterface.addColumn("patients", "blood_type", {
      type: Sequelize.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
      allowNull: false,
    });

    await queryInterface.addColumn("patients", "alergias", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.addColumn("patients", "cronicas_condition", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.addColumn("patients", "actual_medication", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the added columns
    await queryInterface.removeColumn("patients", "actual_medication");
    await queryInterface.removeColumn("patients", "cronicas_condition");
    await queryInterface.removeColumn("patients", "alergias");
    await queryInterface.removeColumn("patients", "blood_type");
  },
};
