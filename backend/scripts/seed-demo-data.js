#!/usr/bin/env node

/**
 * Script para poblar la base de datos con datos de prueba
 *
 * Este script ejecuta todos los seeders en el orden correcto
 * para crear datos de prueba completos para el sistema HealthTech.
 */

const { execSync } = require("child_process");
const path = require("path");

console.log("🌱 Iniciando proceso de seeding de datos de prueba...\n");

try {
  // Verificar que estamos en el directorio correcto
  const packageJson = require(path.join(__dirname, "../package.json"));
  if (!packageJson.scripts["db:seed"]) {
    throw new Error("Scripts de Sequelize no encontrados en package.json");
  }

  console.log("📋 Ejecutando seeders en orden:");

  // Lista de seeders en orden de ejecución
  const seeders = [
    "20250115000001-demo-roles.js",
    "20250115000002-demo-health-insurance.js",
    "20250115000003-demo-users.js",
    "20250115000004-demo-patients.js",
    "20250115000005-demo-medics.js",
    "20250115000006-demo-appointments.js",
    "20250115000007-demo-medical-records.js",
    "20250115000008-demo-teleconsultations.js",
    "20250115000009-demo-notifications.js",
  ];

  // Ejecutar cada seeder individualmente
  seeders.forEach((seeder, index) => {
    console.log(`   ${index + 1}. ${seeder}`);
    try {
      execSync(`npx sequelize-cli db:seed --seed ${seeder}`, {
        stdio: "inherit",
        cwd: path.join(__dirname, ".."),
      });
      console.log(`   ✅ ${seeder} ejecutado correctamente\n`);
    } catch (error) {
      console.error(`   ❌ Error ejecutando ${seeder}:`, error.message);
      throw error;
    }
  });

  console.log("🎉 ¡Todos los seeders ejecutados correctamente!");
  console.log("\n📊 Datos creados:");
  console.log("   • 3 Roles (admin, doctor, patient)");
  console.log("   • 5 Obras sociales");
  console.log("   • 12 Usuarios (1 admin, 4 doctores, 7 pacientes)");
  console.log("   • 7 Registros de pacientes");
  console.log("   • 4 Registros de médicos");
  console.log("   • 10 Citas médicas");
  console.log("   • 5 Historiales médicos");
  console.log("   • 3 Teleconsultas");
  console.log("   • 9 Notificaciones");

  console.log("\n🔑 Credenciales de prueba:");
  console.log("   Admin: admin@healthtech.com (password: password123)");
  console.log("   Doctor: maria.garcia@healthtech.com (password: password123)");
  console.log("   Paciente: laura.fernandez@gmail.com (password: password123)");

  console.log("\n✨ ¡Base de datos lista para pruebas!");
} catch (error) {
  console.error("\n❌ Error durante el proceso de seeding:", error.message);
  console.log("\n💡 Sugerencias:");
  console.log("   • Verificar que la base de datos esté configurada");
  console.log("   • Ejecutar migraciones primero: npm run db:migrate");
  console.log("   • Verificar que el archivo .env esté configurado");
  process.exit(1);
}
