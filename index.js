(async () => {
    const database = require('./db');
    const Produtos = require('./produtos');
    await database.sync();
})();