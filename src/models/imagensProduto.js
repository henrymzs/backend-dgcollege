const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')
const Produtos = require('./produtos');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

const imagensProdutos = sequelize.define('imagensProdutos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produtos,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    path: {
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


imagensProdutos.belongsTo(Produtos, { as: 'produto', FOREIGNKEYS: 'product_id' });
Produtos.hasMany(imagensProdutos, { as: 'imagensProdutos', FOREIGNKEYS: 'product_id' });

sequelize.sync()
    .then(() => {
        console.log("Tabelas sincronizadas com sucesso. ");
    })
    .catch(err => {
        console.error("Erro ao sincronizar tabelas! ", err);
    })

module.exports = imagensProdutos;