"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_config_1 = require("./config/app.config");
const session_config_1 = require("./config/session.config");
const passport_config_1 = require("./config/passport.config");
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_config_1 = require("./config/cors.config");
const database_config_1 = require("./config/database.config");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = require("./config/swagger.config");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(cors_config_1.corsConfig));
app.use(session_config_1.sessionConfig);
app.use(passport_config_1.passportConfig.initialize());
app.use(passport_config_1.passportConfig.session());
// Swagger documentation
app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "HealthTech API Documentation",
}));
// Serve Swagger JSON
app.get("/api.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swagger_config_1.swaggerSpec);
});
// Database connection and synchronization
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_config_1.sequelize.authenticate();
        console.log("✅ Database connection established successfully.");
        // Sync models with database (in development)
        if (app_config_1.appConfig.nodeEnv === "development") {
            yield database_config_1.sequelize.sync({ alter: true });
            console.log("✅ Database synchronized successfully.");
        }
    }
    catch (error) {
        console.error("❌ Unable to connect to the database:", error);
        process.exit(1);
    }
});
// Initialize database and start server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeDatabase();
    app.listen(app_config_1.appConfig.port, () => {
        console.log(`🚀 Server listening on port: ${app_config_1.appConfig.port}`);
        console.log(`🌍 Environment: ${app_config_1.appConfig.nodeEnv}`);
        console.log(`📚 API Documentation: http://localhost:${app_config_1.appConfig.port}/api`);
        console.log(`📄 Swagger JSON: http://localhost:${app_config_1.appConfig.port}/api.json`);
    });
});
app.use("/api", index_1.default);
startServer().catch((error) => {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
});
exports.default = app;
