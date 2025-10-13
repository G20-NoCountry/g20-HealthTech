import { env } from "process";

export const appConfig = {
    port: env.APP_PORT ?? 3000,
};
