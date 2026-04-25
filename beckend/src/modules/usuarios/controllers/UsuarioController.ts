import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

export class UsuarioController {
  private usuarioService = new UsuarioService();

  async listarUsuarios(request: Request, response: Response) {
    const { clienteId, idcliente } = request.query;
    const filtroCliente = clienteId ?? idcliente;

    if (filtroCliente) {
      const clienteIdNumerico = Number(filtroCliente);

      if (Number.isNaN(clienteIdNumerico)) {
        return response.status(400).json({ mensagem: "clienteId invalido" });
      }

      const usuarios =
        await this.usuarioService.listarUsuariosPorCliente(clienteIdNumerico);
      return response.json(usuarios);
    }

    const usuarios = await this.usuarioService.listarUsuarios();
    return response.json(usuarios);
  }

  async login(request: Request, response: Response) {
    const { email, senha } = request.body;

    const usuario = await this.usuarioService.login(email, senha);

    return response.json(usuario);
  }

  async cadastrarUsuario(request: Request, response: Response) {
    const { nome, email, senha, clienteId } = request.body;

    if (!nome || !email || !senha || !clienteId) {
      return response
        .status(400)
        .json({ mensagem: "Todos os campos sao obrigatorios" });
    }

    const novoUsuario = await this.usuarioService.cadastrarUsuario(
      nome,
      email,
      senha,
      clienteId,
    );

    return response.status(201).json(novoUsuario);
  }

  async atualizarUsuario(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, email, senha } = request.body;

    const usuarioAtualizado = await this.usuarioService.atualizarUsuario(
      Number(id),
      nome,
      email,
      senha,
    );

    return response.json(usuarioAtualizado);
  }

  async deletarUsuario(request: Request, response: Response) {
    const { id } = request.params;

    await this.usuarioService.deletarUsuario(Number(id));

    return response.status(204).send();
  }
}
