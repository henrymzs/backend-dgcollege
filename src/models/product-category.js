const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProductCategory extends Model {}

ProductCategory.init({
    product_id: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    category_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'product_category',
    timestamps: false,  
    underscored: true
});

module.exports = ProductCategory;
