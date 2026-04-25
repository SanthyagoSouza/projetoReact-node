import { ModuloRepository } from "../repositories/ModuloRepositori";

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

export class ModuloService {
  private moduloRepository = new ModuloRepository();

  async listarModulos() {
    return this.moduloRepository.listarModulos();
  }

  async buscarModuloPorId(id: number) {
    return this.moduloRepository.buscarModuloPorId(id);
  }

  async cadastrarModulo(dados: ModuloInput) {
    // regra de negócio básica
    if (!dados.nome) {
      throw new Error("Nome é obrigatório");
    }

    // exemplo de regra útil: gerar slug automático
    const slug = dados.nome
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    return this.moduloRepository.criarModulo({
      ...dados,
      slug,
      ativo: true,
    });
  }

  async atualizarModulo(id: number, dados: ModuloInput) {
    // verifica se existe antes de atualizar
    const moduloExistente = await this.moduloRepository.buscarModuloPorId(id);

    if (!moduloExistente) {
      throw new Error("Módulo não encontrado");
    }

    // se vier nome, atualiza slug também
let slugAtualizado: string | null = moduloExistente.slug ?? null;

    if (dados.nome) {
      slugAtualizado = dados.nome
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
    }

    return this.moduloRepository.atualizarModulo(id, {
      ...dados,
      slug: slugAtualizado,
    });
  }

  async deletarModulo(id: number) {
    const moduloExistente = await this.moduloRepository.buscarModuloPorId(id);

    if (!moduloExistente) {
      throw new Error("Módulo não encontrado");
    }

    return this.moduloRepository.deletarModulo(id);
  }
}
