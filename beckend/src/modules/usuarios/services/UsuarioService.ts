import { UsuarioRepository } from "../usuarios/repositories/UsuarioRepository";


export class UsuarioService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    // Mantive no plural para combinar com controller e repository.
    async listarUsuarios() {
        return await this.usuarioRepository.listarUsuarios();
    }

}
