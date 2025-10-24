"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash de contraseñas de prueba
    const hashedPassword = await bcrypt.hash("password123", 10);

    await queryInterface.bulkInsert(
      "users",
      [
        // Médicos
        {
          id: 1,
          rol: "medico",
          first_name: "Dr. María",
          last_name: "García",
          email: "maria.garcia@healthtech.com",
          phone: "+54 11 2345-6789",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          rol: "medico",
          first_name: "Dr. Juan",
          last_name: "Rodríguez",
          email: "juan.rodriguez@healthtech.com",
          phone: "+54 11 3456-7890",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          rol: "medico",
          first_name: "Dra. Ana",
          last_name: "López",
          email: "ana.lopez@healthtech.com",
          phone: "+54 11 4567-8901",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          rol: "medico",
          first_name: "Dr. Carlos",
          last_name: "Martínez",
          email: "carlos.martinez@healthtech.com",
          phone: "+54 11 5678-9012",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Pacientes
        {
          id: 5,
          rol: "paciente",
          first_name: "Laura",
          last_name: "Fernández",
          email: "laura.fernandez@gmail.com",
          phone: "+54 11 6789-0123",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          rol: "paciente",
          first_name: "Roberto",
          last_name: "Silva",
          email: "roberto.silva@hotmail.com",
          phone: "+54 11 7890-1234",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          rol: "paciente",
          first_name: "Carmen",
          last_name: "González",
          email: "carmen.gonzalez@yahoo.com",
          phone: "+54 11 8901-2345",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          rol: "paciente",
          first_name: "Diego",
          last_name: "Pérez",
          email: "diego.perez@gmail.com",
          phone: "+54 11 9012-3456",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          rol: "paciente",
          first_name: "Sofía",
          last_name: "Hernández",
          email: "sofia.hernandez@outlook.com",
          phone: "+54 11 0123-4567",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          rol: "paciente",
          first_name: "Miguel",
          last_name: "Torres",
          email: "miguel.torres@gmail.com",
          phone: "+54 11 1234-5678",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          rol: "paciente",
          first_name: "Elena",
          last_name: "Vargas",
          email: "elena.vargas@hotmail.com",
          phone: "+54 11 2345-6789",
          password: hashedPassword,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
