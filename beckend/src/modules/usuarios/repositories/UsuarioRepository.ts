import { prisma } from "../../../shared/database/prisma";

export class UsuarioRepository {
  // A consulta precisa ficar dentro do metodo para nao rodar no import do arquivo.
  async listarUsuarios() {
    return await prisma.usuarios.findMany();
  }
}
