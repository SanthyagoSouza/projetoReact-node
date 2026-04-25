import { UsuarioRepository } from "../repositories/UsuarioRepository";

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async listarUsuarios() {
    return await this.usuarioRepository.listarUsuarios();
  }

  async listarUsuariosPorCliente(clienteId: number) {
    return await this.usuarioRepository.listarUsuariosPorCliente(clienteId);
  }
  async login(email: string, senha: string) {
    const usuario = await this.usuarioRepository.buscarPorEmail(email);

    if (!usuario || usuario.senha !== senha) {
      throw new Error("Credenciais invalidas");
    }

    const { senha: _senha, ...usuarioSemSenha } = usuario;

    return usuarioSemSenha;
  }
}
