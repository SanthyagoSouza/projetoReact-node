const db = require('../config/db');

// LISTAR CLIENTES
async function listarClientes(req, res) {
    const [teste] = await db.query('SELECT 1');
    console.log(teste);
    try {
        const [clientes] = await db.query(`
            SELECT 
                idcliente, 
                nome, 
                email, 
                status, 
                criado_em
            FROM clientes
            ORDER BY criado_em DESC
        `);

        res.status(200).json(clientes);
            
    } catch (erro) {
        console.error('Erro ao buscar clientes:', erro);
        res.status(500).json({ erro: 'Erro ao buscar clientes' });
    }
}

// CRIAR CLIENTE
async function criarCliente(req, res) {
    try {
        const { nome, email } = req.body;

        // validação básica
        if (!nome || !email) {
            return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
        }

        const [resultado] = await db.query(`
            INSERT INTO clientes (nome, email)
            VALUES (?, ?)
        `, [nome, email]);

        res.status(201).json({
            mensagem: 'Cliente criado com sucesso',
            idcliente: resultado.insertId
        });

    } catch (erro) {
        console.error('Erro ao criar cliente:', erro);
        res.status(500).json({ erro: 'Erro ao criar cliente' });
    }
}

// EXPORTAÇÃO (ESSENCIAL)
module.exports = {
    listarClientes,
    criarCliente
};