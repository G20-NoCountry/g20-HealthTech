"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "patients",
      [
        {
          id: 5, // Laura Fernández
          id_health_insurance: 1, // OSDE
          location: "Buenos Aires, CABA",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6, // Roberto Silva
          id_health_insurance: 2, // UOM
          location: "Córdoba, Córdoba",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7, // Carmen González
          id_health_insurance: 3, // Otros
          location: "Rosario, Santa Fe",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8, // Diego Pérez
          id_health_insurance: 4, // etc
          location: "Mendoza, Mendoza",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9, // Sofía Hernández
          id_health_insurance: 1, // OSDE
          location: "La Plata, Buenos Aires",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10, // Miguel Torres
          id_health_insurance: 3, // Otros
          location: "Tucumán, Tucumán",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11, // Elena Vargas
          id_health_insurance: 2, // UOM
          location: "Salta, Salta",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("patients", null, {});
  },
};
