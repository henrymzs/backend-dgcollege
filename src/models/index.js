const sequelize = require('../config/database');
const Category = require('./category');
const Product = require('./product');
const ProductOption = require('./product-option');
const ProductImage = require('./product-image');
const ProductCategory = require('./product-category'); 

const models = {
    Category,
    Product,
    ProductOption,
    ProductImage,
    ProductCategory 
};

Category.belongsToMany(Product, {
    through: 'product_category',
    foreignKey: 'category_id',
    otherKey: 'product_id',
    as: 'products'
});

Product.belongsToMany(Category, {
    through: 'product_category',
    foreignKey: 'product_id',
    otherKey: 'category_id',
    as: 'categories' 
});

Product.hasMany(ProductOption, {
    foreignKey: 'product_id',
    as: 'options',
    onDelete: 'CASCADE'  
});

ProductOption.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

Product.hasMany(ProductImage, {
    foreignKey: 'product_id',
    as: 'images',
    onDelete: 'CASCADE' 
});

ProductImage.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

module.exports = {
    sequelize,
    ...models
};
