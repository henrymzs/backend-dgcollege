(async () => {
    const database = require('./db');
    const Produtos = require('./produtos');
    const tabelaUsuarios = require('./tabelaUsuarios');
    await database.sync();
})();