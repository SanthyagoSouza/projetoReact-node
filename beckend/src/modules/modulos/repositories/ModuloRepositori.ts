import { prisma } from "../../../shared/database/prisma";

type ModuloInput = {
  nome?: string;
  descricao?: string;
  chave?: string;
  slug?: string | null;
  rota?: string;
  icone?: string;
  ordem?: number;
  ativo?: boolean;
};

export class ModuloRepository {
  async listarModulos() {
    return prisma.modulos.findMany({
      orderBy: {
        ordem: "asc",
      },
    });
  }

  async buscarModuloPorId(id: number) {
    return prisma.modulos.findUnique({
      where: { idmodulo: id },
    });
  }

  async criarModulo(dados: ModuloInput) {
    return prisma.modulos.create({
      data: {
        nome: dados.nome!,
        descricao: dados.descricao ?? null,
        chave: dados.chave ?? null,
        slug: dados.slug ?? null,
        rota: dados.rota ?? null,
        icone: dados.icone ?? null,
        ordem: dados.ordem ?? 0,
        ativo: dados.ativo ?? true,
      },
    });
  }

  async atualizarModulo(id: number, dados: ModuloInput) {
    return prisma.modulos.update({
      where: { idmodulo: id },
      data: {
        nome: dados.nome,
        descricao: dados.descricao,
        chave: dados.chave,
        slug: dados.slug,
        rota: dados.rota,
        icone: dados.icone,
        ordem: dados.ordem,
        ativo: dados.ativo,
      },
    });
  }

  async deletarModulo(id: number) {
    return prisma.modulos.delete({
      where: {  idmodulo: id },
    });
  }
}
