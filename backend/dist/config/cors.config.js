"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const app_config_1 = require("../config/app.config");
exports.corsConfig = {
    origin: app_config_1.appConfig.frontendUrl,
    credentials: true,
};
