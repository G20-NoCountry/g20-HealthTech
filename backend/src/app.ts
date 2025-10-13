import express from "express";
import cors from "cors";
import { appConfig } from "./config/app.config";
import { corsConfig } from "./config/cors.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(appConfig.port, () => {
    console.log(`Escuchando en el puerto: ${appConfig.port}`);
});