import express from "express";
import { usuarioRoutes } from "./modules/routes/usuarioRoutes";

const app = express();

app.use(express.json());
app.use(usuarioRoutes);

export { app };
