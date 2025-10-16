"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("medic", {
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
      specialty: {
        type: Sequelize.ENUM(
          "oftamologia",
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
      },
      licence_num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      schedule_from: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      schedule_to: {
        type: Sequelize.DATE,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("medic");
  },
};
