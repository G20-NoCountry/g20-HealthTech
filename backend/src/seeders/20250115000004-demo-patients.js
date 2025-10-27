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
          health_insurance: "OSECAC", // OSECAC
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
          health_insurance: "OSPRERA", // OSPRERA
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
          health_insurance: "OSPE", // OSPE
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
          health_insurance: "OSSEG", // OSSEG
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
          health_insurance: "OSECAC", // OSECAC
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
          health_insurance: "OSIAD", // OSIAD
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
          health_insurance: "OSPECON", // OSPECON
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
