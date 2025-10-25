import express from "express";
import { appConfig } from "./config/app.config";
import { sessionConfig } from "./config/session.config";
import { passportConfig } from "./config/passport.config";
import router from "./routes/index";
import cors from "cors";
import dotenv from "dotenv";
import { corsConfig } from "./config/cors.config";
import { sequelize } from "./config/database.config";
import models from "./models";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";

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


// Swagger documentation - Must be after API routes
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "HealthTech API Documentation",
  })
);

// Serve Swagger JSON
app.get("/api.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// API Routes - Must be before Swagger middleware
app.use("/api", router);

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
    console.log(
      `📚 API Documentation: http://localhost:${appConfig.port}/api/docs`
    );
    console.log(`📄 Swagger JSON: http://localhost:${appConfig.port}/api.json`);
  });
};

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});

export default app;
