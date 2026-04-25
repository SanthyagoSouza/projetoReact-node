import { Router } from "express";
import { ModuloController } from "../controller/ModuloController";

const router = Router();
const moduloController = new ModuloController();

router.get("/", moduloController.listarModulos.bind(moduloController));

router.get("/:id", moduloController.buscarModuloPorId.bind(moduloController));

router.post("/", moduloController.cadastrarModulo.bind(moduloController));

router.put("/:id", moduloController.atualizarModulo.bind(moduloController));

router.delete("/:id", moduloController.deletarModulo.bind(moduloController));

export default router;
