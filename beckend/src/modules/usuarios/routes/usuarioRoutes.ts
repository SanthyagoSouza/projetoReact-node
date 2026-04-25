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

router.post("/usuarios", (req, res) => {
  return usuarioController.cadastrarUsuario(req, res);
});

router.put("/usuarios/:id", (req, res) => {
  return usuarioController.atualizarUsuario(req, res);
});

router.delete("/usuarios/:id", (req, res) => {
  return usuarioController.deletarUsuario(req, res);
});

export { router as usuarioRoutes };
