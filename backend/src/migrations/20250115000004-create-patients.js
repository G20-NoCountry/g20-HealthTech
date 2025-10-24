"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("patients", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      health_insurance: {
        type: Sequelize.ENUM(
          "OSECAC",
          "OSPRERA",
          "UPCN",
          "OBSBA",
          "OSDEPYM",
          "OSUTHGRA",
          "OSPE",
          "OSPECON",
          "OSIAD",
          "OSSEG"
        ),
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      blood_type: {
        type: Sequelize.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
        allowNull: false,
      },
      alergias: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cronicas_condition: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      actual_medication: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("patients");
  },
};
