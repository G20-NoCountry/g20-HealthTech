const { execSync } = require("child_process");

const seeds = [
  "20250115000003-demo-users.js",
  "20250115000004-demo-patients.js",
  "20250115000005-demo-medics.js",
  "20250115000006-demo-appointments.js",
  "20250115000007-demo-medical-records.js",
  "20250115000008-demo-teleconsultations.js",
  "20250115000009-demo-notifications.js",
];

console.log("Ejecutando todos los seeds secuencialmente...\n");

try {
  console.log("Limpiando seeds existentes...");
  execSync("npx sequelize-cli db:seed:undo:all", { stdio: "inherit" });

  for (const seed of seeds) {
    console.log(`\nEjecutando seed: ${seed}`);
    execSync(`npx sequelize-cli db:seed --seed ${seed}`, { stdio: "inherit" });
    console.log(`Seed ${seed} completado exitosamente`);
  }

  console.log("\n¡Todos los seeds ejecutados exitosamente!");
} catch (error) {
  console.error("\nError:", error.message);
  process.exit(1);
}
