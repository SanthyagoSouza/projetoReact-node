import { Request, Response } from "express";
import { PlanosService } from "../service/PlanosService";

export class PlanoController {
  private planosService = new PlanosService();

  async listarPlanos(request: Request, response: Response) {
    const planos = await this.planosService.listarPlanos();
    return response.json(planos);
  }

  async buscarPlanoPorId(request: Request, response: Response) {
    const { id } = request.params;

    const plano = await this.planosService.buscarPlanoPorId(Number(id));

    return response.json(plano);
  }

  async cadastrarPlano(request: Request, response: Response) {
    const { nome, valor, limite_usuarios, ativo, modulos } = request.body;

    const plano = await this.planosService.cadastrarPlano({
      nome,
      valor,
      limite_usuarios,
      ativo,
      modulos,
    });

    return response.status(201).json(plano);
  }

  async atualizarPlano(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, valor, limite_usuarios, ativo, modulos } = request.body;

    const planoAtualizado = await this.planosService.atualizarPlano(
      Number(id),
      { nome, valor, limite_usuarios, ativo, modulos },
    );

    return response.json(planoAtualizado);
  }

  async deletarPlano(request: Request, response: Response) {
    const { id } = request.params;

    await this.planosService.deletarPlano(Number(id));

    return response.status(204).send();
  }
}
