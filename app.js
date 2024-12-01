const express = require('express')
const app = express()

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

app.get('/routerProduct', (req, res) => {
    res.status(200).json({ message: 'Rota funcionando!' });
});

module.exports = app;
