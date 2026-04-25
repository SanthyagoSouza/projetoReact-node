import { Prisma } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";

type PlanoData = {
  nome?: string;
  valor?: number | string | Prisma.Decimal;
  limite_usuarios?: number;
  ativo?: boolean;
};

export class PlanosRepository {
  async listarPlanos() {
    return await prisma.planos.findMany({
      include: {
        _count: {
          select: {
            plano_modulo: true,
          },
        },
      },
      orderBy: {
        idplano: "desc",
      },
    });
  }

  async buscarPlanoPorId(id: number) {
    return await prisma.planos.findUnique({
      where: { idplano: id },
      include: {
        plano_modulo: {
          include: {
            modulos: true,
          },
        },
      },
    });
  }

  async criarPlano(data: PlanoData, tx: Prisma.TransactionClient = prisma) {
    return await tx.planos.create({
      data,
    });
  }

  async criarPlanoModulos(
    data: {
      idplano: number;
      idmodulo: number;
    }[],
    tx: Prisma.TransactionClient = prisma,
  ) {
    return await tx.plano_modulo.createMany({
      data,
    });
  }

  async deletarPlanoModulos(idplano: number, tx: Prisma.TransactionClient = prisma) {
    return await tx.plano_modulo.deleteMany({
      where: { idplano },
    });
  }

  async atualizarPlano(
    id: number,
    data: PlanoData,
    tx: Prisma.TransactionClient = prisma,
  ) {
    return await tx.planos.update({
      where: { idplano: id },
      data,
    });
  }

  async deletarPlano(id: number) {
    return await prisma.planos.delete({
      where: { idplano: id },
    });
  }
}
