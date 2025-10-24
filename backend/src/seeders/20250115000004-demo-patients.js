"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener los IDs de los usuarios pacientes
    const [users] = await queryInterface.sequelize.query(
      "SELECT id, email FROM users WHERE rol = 'paciente' ORDER BY id"
    );

    await queryInterface.bulkInsert(
      "patients",
      [
        {
          id: users[0].id, // Laura Fernández
          id_health_insurance: 1, // OSDE
          location: "Buenos Aires, CABA",
          blood_type: "A+",
          alergias: "Ninguna",
          cronicas_condition: "Hipertensión arterial",
          actual_medication: "Enalapril 10mg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: users[1].id, // Roberto Silva
          id_health_insurance: 2, // UOM
          location: "Córdoba, Córdoba",
          blood_type: "O+",
          alergias: "Penicilina",
          cronicas_condition: "Migraña",
          actual_medication: "Ibuprofeno según necesidad",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: users[2].id, // Carmen González
          id_health_insurance: 3, // Otros
          location: "Rosario, Santa Fe",
          blood_type: "B+",
          alergias: "Ninguna",
          cronicas_condition: "Ninguna",
          actual_medication: "Ninguna",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: users[3].id, // Diego Pérez
          id_health_insurance: 4, // etc
          location: "Mendoza, Mendoza",
          blood_type: "AB-",
          alergias: "Polen",
          cronicas_condition: "Miopía",
          actual_medication: "Antihistamínicos en primavera",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: users[4].id, // Sofía Hernández
          id_health_insurance: 1, // OSDE
          location: "La Plata, Buenos Aires",
          blood_type: "A-",
          alergias: "Ninguna",
          cronicas_condition: "Hipertensión controlada",
          actual_medication: "Enalapril 5mg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: users[5].id, // Miguel Torres
          id_health_insurance: 3, // Otros
          location: "Tucumán, Tucumán",
          blood_type: "O-",
          alergias: "Ninguna",
          cronicas_condition: "Ninguna",
          actual_medication: "Ninguna",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: users[6].id, // Elena Vargas
          id_health_insurance: 2, // UOM
          location: "Salta, Salta",
          blood_type: "B-",
          alergias: "Ninguna",
          cronicas_condition: "Ninguna",
          actual_medication: "Ninguna",
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
