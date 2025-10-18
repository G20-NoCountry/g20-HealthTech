import express from "express";
import { appConfig } from "./config/app.config";
import { sessionConfig } from "./config/session.config";
import { passportConfig } from "./config/passport.config";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import dotenv from "dotenv";
import { corsConfig } from "./config/cors.config";
import { sequelize } from "./config/database.config";
import models from "./models";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));

app.use(sessionConfig);
app.use(passportConfig.initialize());
app.use(passportConfig.session());


// Database connection and synchronization
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    // Sync models with database (in development)
    if (appConfig.nodeEnv === "development") {
      await sequelize.sync({ alter: true });
      console.log("✅ Database synchronized successfully.");
    }
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};

// Initialize database and start server
const startServer = async () => {
  await initializeDatabase();
  
  app.listen(appConfig.port, () => {
    console.log(`🚀 Server listening on port: ${appConfig.port}`);
    console.log(`🌍 Environment: ${appConfig.nodeEnv}`);
  });
};

app.use('/api/auth', authRoutes);

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});

export default app;
