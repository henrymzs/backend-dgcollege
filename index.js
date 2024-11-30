(async () => {
    const database = require('./db');
    const Produtos = require('./produtos');
    const tabelaUsuarios = require('./tabelaUsuarios');
    const tabelaCategorias = require('./tabelaCategorias');
    const opcoesProdutos = require('./opcoesProdutos');
    const imagensProdutos = require('./imagensProduto');
    await database.sync();
})();