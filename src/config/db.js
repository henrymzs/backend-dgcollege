// const Sequelize = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {

//     dialect: process.env.DB_DIALECT,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT

// })


// sequelize.authenticate()
//   .then(() => {
//     console.log('Conexão estabelecida com sucesso.');
//   })
//   .catch(err => {
//     console.error('Não foi possível conectar ao banco de dados:', err);
//   });

// module.exports = sequelize;


const { Sequelize } = require('sequelize');

// Configurar conexão diretamente com os valores
const sequelize = new Sequelize('sql10749859', 'sql10749859', 'dcLPRXeWpG', {
  host: 'sql10.freesqldatabase.com',       // Host do banco
  dialect: 'mysql',        // Dialect do banco (mysql, sqlite, postgres, etc.)
  port: 3306,              // Porta do banco
});

// Testar conexão com o banco
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco foi bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco:', error);
  });

module.exports = sequelize;