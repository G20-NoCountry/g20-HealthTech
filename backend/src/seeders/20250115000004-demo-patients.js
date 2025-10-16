"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "patients",
      [
        {
          id: 6, // Laura Fernández
          id_health_insurance: 1, // OSDE
          location: "Buenos Aires, CABA",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7, // Roberto Silva
          id_health_insurance: 2, // Swiss Medical
          location: "Córdoba, Córdoba",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8, // Carmen González
          id_health_insurance: 3, // Galeno
          location: "Rosario, Santa Fe",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9, // Diego Pérez
          id_health_insurance: 4, // Medicus
          location: "Mendoza, Mendoza",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10, // Sofía Hernández
          id_health_insurance: 1, // OSDE
          location: "La Plata, Buenos Aires",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11, // Miguel Torres
          id_health_insurance: 5, // Sin seguro
          location: "Tucumán, Tucumán",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 12, // Elena Vargas
          id_health_insurance: 2, // Swiss Medical
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
