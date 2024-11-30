(async () => {
    const database = require('./db');
    const Produtos = require('./produtos');
    const tabelaUsuarios = require('./tabelaUsuarios');
    const tabelaCategorias = require('./tabelaCategorias');
    await database.sync();
})();