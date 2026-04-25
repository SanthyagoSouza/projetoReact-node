import express from "express";
import planosRoutes from "./modules/planos/routes/planosRoutes";
import { usuarioRoutes } from "./modules/usuarios/routes/usuarioRoutes";
import moduloRoutes from "./modules/modulos/routes/ModuloRoute";

const app = express();

app.use(express.json());
app.use(usuarioRoutes);
app.use("/modulos", moduloRoutes);
app.use("/planos", planosRoutes);

export { app };
