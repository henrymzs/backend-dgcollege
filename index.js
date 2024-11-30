(async () => {
    const database = require('./src/config/db');
    const Produtos = require('./src/models/produtos');
    const tabelaUsuarios = require('./src/models/tabelaUsuarios');
    const tabelaCategorias = require('./src/models/tabelaCategorias');
    const opcoesProdutos = require('./src/models/opcoesProdutos');
    const imagensProdutos = require('./src/models/imagensProduto');
    await database.sync();
})();