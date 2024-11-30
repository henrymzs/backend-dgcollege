const sequelize = require('../config/db')
const { DataTypes } =  require('sequelize')

const usuario = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncremente: true,
        primaryKey: true
    },

    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
});

sequelize.sync()
    .then(() => {
        console.log(("Tabelas usuários sincronizadas com sucesso. "));
    })
    .catch(err => {
        console.error("Erro ao sincronizar tabelas! ",err );        
    });

module.exports = usuario;