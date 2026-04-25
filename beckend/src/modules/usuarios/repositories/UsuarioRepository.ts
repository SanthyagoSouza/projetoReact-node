import { prisma } from "../../../shared/database/prisma";

export class UsuarioRepository {
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

  async cadastrarUsuario(
    nome: string,
    email: string,
    senha: string,
    clienteId: number,
  ) {
    return await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha,
        idcliente: clienteId,
      },
    });
  }

  async atualizarUsuario(
    id: number,
    nome?: string,
    email?: string,
    senha?: string,
  ) {
    const dadosAtualizados: {
      nome?: string;
      email?: string;
      senha?: string;
    } = {};

    if (nome) dadosAtualizados.nome = nome;
    if (email) dadosAtualizados.email = email;
    if (senha) dadosAtualizados.senha = senha;

    return await prisma.usuarios.update({
      where: { idusuario: id },
      data: dadosAtualizados,
    });
  }

  async deletarUsuario(id: number) {
    return await prisma.usuarios.delete({
      where: { idusuario: id },
    });
  }
}
