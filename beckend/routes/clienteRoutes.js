const express = require('express');
const router = express.Router();

const { listarClientes, criarCliente } = require('../controllers/clienteController');

router.get('/clientes', listarClientes);
router.post('/clientes', criarCliente);

module.exports = router;