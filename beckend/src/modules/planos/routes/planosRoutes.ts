import { Router } from "express";
import { PlanoController } from "../controllers/PlanoController";

const router = Router();
const planoController = new PlanoController();

router.get("/", planoController.listarPlanos.bind(planoController));
router.get("/:id", planoController.buscarPlanoPorId.bind(planoController));
router.post("/", planoController.cadastrarPlano.bind(planoController));
router.put("/:id", planoController.atualizarPlano.bind(planoController));
router.delete("/:id", planoController.deletarPlano.bind(planoController));

export default router;
