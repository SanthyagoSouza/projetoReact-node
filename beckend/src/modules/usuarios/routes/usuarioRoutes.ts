import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router();
const usuarioController = new UsuarioController();

router.get("/usuarios", (req, res) => {
  return usuarioController.listarUsuarios(req, res);
});

router.post("/login", (req, res) => {
  return usuarioController.login(req, res);
});

router.post("/usuarios/login", (req, res) => {
  return usuarioController.login(req, res);
});

export { router as usuarioRoutes };
