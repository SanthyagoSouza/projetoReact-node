import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

export class UsuarioController {
  private usuarioService = new UsuarioService();

  async listarUsuarios(request: Request, response: Response) {
    // O nome do metodo agora esta padronizado em toda a cadeia.
    const usuarios = await this.usuarioService.listarUsuarios();
    return response.json(usuarios);
  }
}
