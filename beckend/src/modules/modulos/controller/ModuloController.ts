import { Request, Response } from "express";
import { ModuloService } from "../service/ModuloService";

export class ModuloController {
  private moduloService = new ModuloService();

  async listarModulos(request: Request, response: Response) {
    try {
      const modulos = await this.moduloService.listarModulos();
      return response.json(modulos);
    } catch (erro) {
      console.error("Erro ao listar módulos:", erro);
      return response
        .status(500)
        .json({ mensagem: "Erro interno ao listar módulos" });
    }
  }

  async buscarModuloPorId(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id || isNaN(Number(id))) {
        return response.status(400).json({ mensagem: "ID inválido" });
      }

      const modulo = await this.moduloService.buscarModuloPorId(Number(id));

      if (!modulo) {
        return response.status(404).json({ mensagem: "Módulo não encontrado" });
      }

      return response.json(modulo);
    } catch (erro) {
      console.error("Erro ao buscar módulo:", erro);
      return response
        .status(500)
        .json({ mensagem: "Erro interno ao buscar módulo" });
    }
  }

  async cadastrarModulo(request: Request, response: Response) {
    try {
      const { nome, descricao } = request.body;

      // validação simples
      if (!nome) {
        return response.status(400).json({ mensagem: "Nome é obrigatório" });
      }

      const modulo = await this.moduloService.cadastrarModulo({
        nome,
        descricao,
      });

      return response.status(201).json(modulo);
    } catch (erro) {
      console.error("Erro ao cadastrar módulo:", erro);
      return response
        .status(500)
        .json({ mensagem: "Erro interno ao cadastrar módulo" });
    }
  }

  async atualizarModulo(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nome, descricao } = request.body;

      if (!id || isNaN(Number(id))) {
        return response.status(400).json({ mensagem: "ID inválido" });
      }

      const moduloAtualizado = await this.moduloService.atualizarModulo(
        Number(id),
        { nome, descricao },
      );

      return response.json(moduloAtualizado);
    } catch (erro: any) {
      console.error("Erro ao atualizar módulo:", erro);

      // caso o prisma retorne erro de registro inexistente
      if (erro.code === "P2025") {
        return response.status(404).json({ mensagem: "Módulo não encontrado" });
      }

      return response
        .status(500)
        .json({ mensagem: "Erro interno ao atualizar módulo" });
    }
  }

  async deletarModulo(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id || isNaN(Number(id))) {
        return response.status(400).json({ mensagem: "ID inválido" });
      }

      await this.moduloService.deletarModulo(Number(id));

      return response.status(204).send();
    } catch (erro: any) {
      console.error("Erro ao deletar módulo:", erro);

      if (erro.code === "P2025") {
        return response.status(404).json({ mensagem: "Módulo não encontrado" });
      }

      return response
        .status(500)
        .json({ mensagem: "Erro interno ao deletar módulo" });
    }
  }
}
