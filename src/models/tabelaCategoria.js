const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const categoria = sequelize.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN
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
        console.log("Tabelas sincronizadas com sucesso. ");
    })
    .catch(err => {
        console.error("Erro ao sincronizar tabelas! ",err);
    })

module.export = categoria;