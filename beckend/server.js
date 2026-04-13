const express = require('express');
const cors = require('cors');

const { login } = require('./controllers/authController');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/auth/login', login);

// 👇 AQUI você usa as rotas
app.use('/api', clienteRoutes);

app.listen(3001, () => {
    console.log('Servidor rodando 🚀');
});