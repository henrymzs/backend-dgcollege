const { DataTypes } = require('sequelize');
const database = require('../config/db');
const sequelize = require('../config/db');

const tabelasProdutos = sequelize.define('tabelasProdutos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    price_with_discount: {
        type: DataTypes.FLOAT,
        allowNull: true
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

module.exports = tabelasProdutos;