import { sequelize } from "../config/database.config";
import models from "../models";

export const initializeDatabase = async () => {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Sync models with database
    await sequelize.sync({ force: false, alter: true });
    console.log("✅ Database synchronized successfully.");

    return true;
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    return false;
  }
};

export const closeDatabaseConnection = async () => {
  try {
    await sequelize.close();
    console.log("✅ Database connection closed.");
  } catch (error) {
    console.error("❌ Error closing database connection:", error);
  }
};
