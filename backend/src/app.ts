import express from "express";
import { appConfig } from "./config/app.config";
import { sessionConfig } from "./config/session.config";
import { passportConfig } from "./config/passport.config";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);
app.use(passportConfig.initialize());
app.use(passportConfig.session());

app.use('/api/auth', authRoutes);

app.listen(appConfig.port, () => {
    console.log(`Escuchando en el puerto: ${appConfig.port}`);
});