import { appConfig } from "../config/app.config";

export const corsConfig = {
    origin: appConfig.frontendUrl,
    credentials: true,
};