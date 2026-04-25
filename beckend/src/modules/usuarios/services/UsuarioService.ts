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

  async cadastrarUsuario(
    nome: string,
    email: string,
    senha: string,
    clienteId: number,
  ) {
    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(email);

    if (usuarioExistente) {
      throw new Error("Email ja cadastrado");
    }

    const novoUsuario = await this.usuarioRepository.cadastrarUsuario(
      nome,
      email,
      senha,
      clienteId,
    );

    const { senha: _senha, ...usuarioSemSenha } = novoUsuario;
    return usuarioSemSenha;
  }

  async atualizarUsuario(
    id: number,
    nome?: string,
    email?: string,
    senha?: string,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualizarUsuario(
      id,
      nome,
      email,
      senha,
    );

    const { senha: _senha, ...usuarioSemSenha } = usuarioAtualizado;
    return usuarioSemSenha;
  }

  async deletarUsuario(id: number) {
    await this.usuarioRepository.deletarUsuario(id);
  }
}
