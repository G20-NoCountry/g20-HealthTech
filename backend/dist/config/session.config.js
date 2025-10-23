"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = void 0;
const express_session_1 = __importDefault(require("express-session"));
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
const app_config_1 = require("./app.config");
dotenv_1.default.config();
exports.sessionConfig = (0, express_session_1.default)({
    secret: (_a = process_1.env.SESSION_SECRET) !== null && _a !== void 0 ? _a : "",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: app_config_1.appConfig.nodeEnv == "development" ? false : true,
        httpOnly: true,
        sameSite: 'strict'
    }
});
