import { prisma } from "../../../shared/database/prisma";

export class UsuarioRepository {
  // A consulta precisa ficar dentro do metodo para nao rodar no import do arquivo.
  async listarUsuarios() {
    return await prisma.usuarios.findMany();
  }

  async listarUsuariosPorCliente(clienteId: number) {
    return await prisma.usuarios.findMany({
      where: {
        idcliente: clienteId,
      },
    });
  }

  async buscarPorEmail(email: string) {
    return await prisma.usuarios.findUnique({
      where: { email },
    });
  }
}