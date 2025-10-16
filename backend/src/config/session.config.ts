import session from "express-session";
import { env } from "process";
import dotenv from "dotenv";

dotenv.config();

export const sessionConfig = session(
    {
        secret: env.SESSION_SECRET ?? "",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: env.APP_ENV == "local" ? false : true,
            httpOnly: true,
            sameSite: 'strict'
        }
    }
);