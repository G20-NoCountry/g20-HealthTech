"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const process_1 = require("process");
exports.appConfig = {
    port: (_a = process_1.env.APP_PORT) !== null && _a !== void 0 ? _a : 3000,
    nodeEnv: (_b = process_1.env.NODE_ENV) !== null && _b !== void 0 ? _b : "development",
    jwtSecret: (_c = process_1.env.JWT_SECRET) !== null && _c !== void 0 ? _c : "your_jwt_secret_key_here",
    jwtExpiresIn: (_d = process_1.env.JWT_EXPIRES_IN) !== null && _d !== void 0 ? _d : "24h",
    frontendUrl: (_e = process_1.env.FRONTEND_URL) !== null && _e !== void 0 ? _e : "http://localhost:5173",
};
