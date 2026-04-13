const db = require('../config/db');

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
        }

        // 🔎 buscar usuário
        const [usuarios] = await db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({ erro: 'Usuário não encontrado' });
        }

        const usuario = usuarios[0];

        // 🔒 valida senha (simples por enquanto)
        if (usuario.senha !== senha) {
            return res.status(401).json({ erro: 'Senha inválida' });
        }

        // 🔥 buscar roles
        const [rolesResult] = await db.query(`
            SELECT r.nome
            FROM roles r
            INNER JOIN usuario_role ur ON ur.idrole = r.idrole
            WHERE ur.idusuario = ?
        `, [usuario.idusuario]);

        const roles = rolesResult.map(r => r.nome);

        return res.json({
            mensagem: "Login bem-sucedido",
            usuario: {
                id: usuario.idusuario,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo,
                roles: roles,
                img: usuario.img,
                idcliente: usuario.idcliente
            }
        });

    } catch (erro) {
        console.error('Erro no login:', erro);
        return res.status(500).json({ erro: 'Erro no servidor' });
    }
}

module.exports = { login };