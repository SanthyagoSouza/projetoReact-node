import { prisma } from "../../../shared/database/prisma";
import { PlanosRepository } from "../repositories/PlanosRepository";

type PlanoInput = {
  nome?: string;
  valor?: number | string;
  limite_usuarios?: number;
  ativo?: boolean;
  modulos?: number[];
};

export class PlanosService {
  private planosRepository = new PlanosRepository();

  async listarPlanos() {
    const planos = await this.planosRepository.listarPlanos();

    return planos.map((plano) => ({
      idplano: plano.idplano,
      nome: plano.nome,
      valor: plano.valor,
      limite_usuarios: plano.limite_usuarios,
      ativo: plano.ativo,
      total_modulos: plano._count.plano_modulo,
    }));
  }

  async buscarPlanoPorId(id: number) {
    const plano = await this.planosRepository.buscarPlanoPorId(id);

    if (!plano) {
      throw new Error("Plano nao encontrado");
    }

    return {
      idplano: plano.idplano,
      nome: plano.nome,
      valor: plano.valor,
      limite_usuarios: plano.limite_usuarios,
      ativo: plano.ativo,
      modulos: plano.plano_modulo.map((item) => item.modulos),
    };
  }

  async cadastrarPlano(data: PlanoInput) {
    const planoData = this.montarDadosPlano(data, true);

    return await prisma.$transaction(async (tx) => {
      const plano = await this.planosRepository.criarPlano(planoData, tx);

      if (data.modulos?.length) {
        await this.planosRepository.criarPlanoModulos(
          data.modulos.map((idmodulo) => ({
            idplano: plano.idplano,
            idmodulo,
          })),
          tx,
        );
      }

      return plano;
    });
  }

  async atualizarPlano(id: number, data: PlanoInput) {
    await this.buscarPlanoPorId(id);
    const planoData = this.montarDadosPlano(data);

    return await prisma.$transaction(async (tx) => {
      const plano = await this.planosRepository.atualizarPlano(id, planoData, tx);

      if (data.modulos !== undefined) {
        await this.planosRepository.deletarPlanoModulos(id, tx);

        if (data.modulos.length) {
          await this.planosRepository.criarPlanoModulos(
            data.modulos.map((idmodulo) => ({
              idplano: id,
              idmodulo,
            })),
            tx,
          );
        }
      }

      return plano;
    });
  }

  async deletarPlano(id: number) {
    await this.buscarPlanoPorId(id);
    await this.planosRepository.deletarPlano(id);
  }

  private montarDadosPlano(data: PlanoInput, obrigatorio = false) {
    const planoData: Omit<PlanoInput, "modulos"> = {};

    if (data.nome !== undefined) planoData.nome = data.nome;
    if (data.valor !== undefined) planoData.valor = data.valor;
    if (data.limite_usuarios !== undefined) {
      planoData.limite_usuarios = data.limite_usuarios;
    }
    if (data.ativo !== undefined) planoData.ativo = data.ativo;

    if (obrigatorio && (!planoData.nome || planoData.valor === undefined)) {
      throw new Error("Nome e valor sao obrigatorios");
    }

    return planoData;
  }
}
