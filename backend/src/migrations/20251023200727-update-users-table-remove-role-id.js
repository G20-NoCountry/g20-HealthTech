"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove foreign key constraint first (if it exists)
    try {
      await queryInterface.removeConstraint("users", "users_ibfk_1");
    } catch (error) {
      // Constraint might not exist, continue
      console.log("Constraint users_ibfk_1 not found, continuing...");
    }

    // Remove the role_id column (if it exists)
    try {
      await queryInterface.removeColumn("users", "role_id");
    } catch (error) {
      // Column might not exist, continue
      console.log("Column role_id not found, continuing...");
    }

    // Add the rol enum column (if it doesn't exist)
    try {
      await queryInterface.addColumn("users", "rol", {
        type: Sequelize.ENUM("medico", "paciente"),
        allowNull: false,
        defaultValue: "paciente",
      });
    } catch (error) {
      // Column might already exist, continue
      console.log("Column rol already exists, continuing...");
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove the rol column
    await queryInterface.removeColumn("users", "rol");

    // Add back the role_id column
    await queryInterface.addColumn("users", "role_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });

    // Add back the foreign key constraint
    await queryInterface.addConstraint("users", {
      fields: ["role_id"],
      type: "foreign key",
      name: "users_ibfk_1",
      references: {
        table: "roles",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },
};
