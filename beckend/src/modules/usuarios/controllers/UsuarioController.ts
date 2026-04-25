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

      const usuarios = await this.usuarioService.listarUsuariosPorCliente(clienteIdNumerico);
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
}
