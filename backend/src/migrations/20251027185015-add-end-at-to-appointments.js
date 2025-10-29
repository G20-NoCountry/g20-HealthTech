'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Primero agregar la columna como nullable
    await queryInterface.addColumn('appointments', 'end_at', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'Fecha y hora de finalización de la cita'
    });

    // Actualizar registros existentes con end_at basado en start_at + 30 minutos
    await queryInterface.sequelize.query(`
      UPDATE appointments 
      SET end_at = DATE_ADD(start_at, INTERVAL 30 MINUTE) 
      WHERE end_at IS NULL
    `);

    // Ahora hacer la columna NOT NULL
    await queryInterface.changeColumn('appointments', 'end_at', {
      type: Sequelize.DATE,
      allowNull: false,
      comment: 'Fecha y hora de finalización de la cita'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('appointments', 'end_at');
  }
};
