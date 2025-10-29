'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar campo deleted_at para borrado lógico
    await queryInterface.addColumn('appointments', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'Fecha y hora del borrado lógico (soft delete)'
    });

    // Agregar campo status para estados de la cita
    await queryInterface.addColumn('appointments', 'status', {
      type: Sequelize.ENUM('scheduled', 'completed', 'cancelled', 'no_show'),
      allowNull: false,
      defaultValue: 'scheduled',
      comment: 'Estado actual de la cita'
    });

    // Agregar campo cancellation_reason para motivo de cancelación
    await queryInterface.addColumn('appointments', 'cancellation_reason', {
      type: Sequelize.STRING(255),
      allowNull: true,
      comment: 'Motivo de cancelación de la cita'
    });

    // Crear índice para mejorar consultas de borrado lógico
    await queryInterface.addIndex('appointments', ['deleted_at'], {
      name: 'idx_appointments_deleted_at'
    });

    // Crear índice para mejorar consultas por estado
    await queryInterface.addIndex('appointments', ['status'], {
      name: 'idx_appointments_status'
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar índices
    await queryInterface.removeIndex('appointments', 'idx_appointments_deleted_at');
    await queryInterface.removeIndex('appointments', 'idx_appointments_status');

    // Eliminar columnas agregadas
    await queryInterface.removeColumn('appointments', 'cancellation_reason');
    await queryInterface.removeColumn('appointments', 'status');
    await queryInterface.removeColumn('appointments', 'deleted_at');
  }
};