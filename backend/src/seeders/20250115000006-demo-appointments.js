"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Obtener los IDs de usuarios
    const [patients] = await queryInterface.sequelize.query(
      "SELECT id, email FROM users WHERE rol = 'paciente' ORDER BY id"
    );
    const [doctors] = await queryInterface.sequelize.query(
      "SELECT id, email FROM users WHERE rol = 'medico' ORDER BY id"
    );

    await queryInterface.bulkInsert(
      "appointments",
      [
        // Citas pasadas (completadas)
        {
          patient_id: patients[0].id, // Laura Fernández
          medic_id: doctors[0].id, // Dr. María García (Cardióloga)
          start_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          type: "in_person",
          symptoms: "Dolor en el pecho y falta de aire",
          diagnostic: "Hipertensión arterial controlada",
          location: "Consultorio 1, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: patients[1].id, // Roberto Silva
          medic_id: doctors[1].id, // Dr. Juan Rodríguez (Neurólogo)
          start_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
          type: "virtual",
          symptoms: "Dolores de cabeza recurrentes",
          diagnostic: "Migraña crónica",
          location: null,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas programadas para mañana
        {
          patient_id: patients[2].id, // Carmen González
          medic_id: doctors[2].id, // Dra. Ana López (Pediatra)
          start_at: new Date(tomorrow.getTime() + 9 * 60 * 60 * 1000), // 9:00 AM
          type: "in_person",
          symptoms: "Fiebre y dolor de garganta",
          diagnostic: "Consulta pediátrica programada",
          location: "Consultorio 2, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: patients[3].id, // Diego Pérez
          medic_id: doctors[3].id, // Dr. Carlos Martínez (Oftalmólogo)
          start_at: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000), // 2:00 PM
          type: "in_person",
          symptoms: "Problemas de visión",
          diagnostic: "Control oftalmológico",
          location: "Consultorio 3, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas programadas para la próxima semana
        {
          patient_id: patients[4].id, // Sofía Hernández
          medic_id: doctors[0].id, // Dr. María García (Cardióloga)
          start_at: new Date(nextWeek.getTime() + 10 * 60 * 60 * 1000), // 10:00 AM
          type: "virtual",
          symptoms: "Control de presión arterial",
          diagnostic: "Seguimiento cardiológico",
          location: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          patient_id: patients[5].id, // Miguel Torres
          medic_id: doctors[1].id, // Dr. Juan Rodríguez (Neurólogo)
          start_at: new Date(nextWeek.getTime() + 15 * 60 * 60 * 1000), // 3:00 PM
          type: "in_person",
          symptoms: "Dolores de cabeza y mareos",
          diagnostic: "Consulta neurológica",
          location: "Consultorio 1, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas para el próximo mes
        {
          patient_id: patients[6].id, // Elena Vargas
          medic_id: doctors[2].id, // Dra. Ana López (Pediatra)
          start_at: new Date(nextMonth.getTime() + 11 * 60 * 60 * 1000), // 11:00 AM
          type: "virtual",
          symptoms: "Control pediátrico",
          diagnostic: "Revisión de crecimiento",
          location: null,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Citas canceladas
        {
          patient_id: patients[0].id, // Laura Fernández
          medic_id: doctors[3].id, // Dr. Carlos Martínez (Oftalmólogo)
          start_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          type: "in_person",
          symptoms: "Problemas de visión",
          diagnostic: "Consulta oftalmológica cancelada",
          location: "Consultorio 3, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Cita sin presentarse
        {
          patient_id: patients[1].id, // Roberto Silva
          medic_id: doctors[0].id, // Dr. María García (Cardióloga)
          start_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          type: "in_person",
          symptoms: "Control cardiológico",
          diagnostic: "Paciente no se presentó",
          location: "Consultorio 1, Clínica Central",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("appointments", null, {});
  },
};
