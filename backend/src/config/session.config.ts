import session from "express-session";
import { env } from "process";
import dotenv from "dotenv";
import { appConfig } from "./app.config";

dotenv.config();

export const sessionConfig = session(
    {
        secret: env.SESSION_SECRET ?? "",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: appConfig.nodeEnv == "development" ? false : true,
            httpOnly: true,
            sameSite: 'strict'
        }
    }
);