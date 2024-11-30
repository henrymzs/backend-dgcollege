const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')
const Produtos = require('./produtos');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

const OpcoesProduto = sequelize.define('opcoesProduto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produtos_id: { // Nome da coluna no banco de dados
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produtos,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shape: {
        type: DataTypes.ENUM('square', 'circle'),
        defaultValue: 'square'
    },
    radius: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        defaultValue: 'text'
    },
    values: {
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
}, {
    tableName: 'opcoesProduto' 
});

OpcoesProduto.belongsTo(Produtos, { as: 'produto', FOREIGNKEYS: 'produtos_id'});
Produtos.hasMany(OpcoesProduto, { as: 'opcoesProdutos', FOREIGNKEYS: 'produtos_id'});

module.exports = OpcoesProduto;