import { env } from "process";

export const appConfig = {
  port: env.APP_PORT ?? 3000,
  nodeEnv: env.NODE_ENV ?? "development",
  jwtSecret: env.JWT_SECRET ?? "your_jwt_secret_key_here",
  jwtExpiresIn: env.JWT_EXPIRES_IN ?? "24h",
  frontendUrl: env.FRONTEND_URL ?? "http://localhost:5173",
};
