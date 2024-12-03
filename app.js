require('dotenv').config()
const express = require('express')
const app = express()
const usuarioRoutes = require('./src/routes/usuario')
const cors = require('cors')

app.use(cors())
app.use(express.json())

/* Criando banco de dados um por um e realizando testes para confirmar que esta dando certo
(async () => {
    const database = require('./src/config/db');
    const tabelasProdutos = require('./src/models/opcoesProdutos');
    const tabelaUsuarios = require('./src/models/tabelaUsuarios');
    const tabelaCategorias = require('./src/models/tabelaCategorias');
    const opcoesProdutos = require('./src/models/opcoesProdutos');
    const imagensProdutos = require('./src/models/imagensProduto');
    await database.sync();
})();
*/
app.get('/',(req,res) => {    
    res.json({
        message: 'Bem-vindo',
    });
})

const jwt = require('jsonwebtoken');
// Chave secreta para assinar os tokens
const secretKey = 'V35JKW1nm*H9f!2@tq&9Z^oPxLq';
// Dados simulados do usuário
const userData = {
  nome: 'Márcio',
  surname: 'jose',
  email: 'marcio@gt.com.br',
  password: '123'

};
// Rota para gerar o token
app.get('/gerar-token', (req, res) => {
  const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });
  res.json({ token });
});
// Rota para validar o token
app.get('/validar-token', (req, res) => {
  const token = req.query.token;
  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ mensagem: 'Token válido', decoded });
  } catch (err) {
    res.status(401).json({ mensagem: 'Token inválido ou expirado', error: err.message });
  }
});

app.get('/routerProduct', (req, res) => {
    res.status(200).json({ message: 'Rota funcionando!' });
});

app.get('/v1/usuarios', (req, res) => {
    res.status(200).json({ message: 'Rota funcionando!' });
});

module.exports = app;
