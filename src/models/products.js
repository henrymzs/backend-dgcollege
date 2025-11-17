const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {
    getDiscountPercentage() {
        if (!this.price_with_discount) return 0;
        return Math.round(((this.price - this.price_with_discount) / this.price) * 100);
    }

    isOnSale() {
        return this.price_with_discount && this.price_with_discount < this.price;
    }

    hasStock(quantity = 1) {
        return this.stock >= quantity;
    }
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,  
        allowNull: true,     
        comment: 'Indica se o produto está ativo'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            is: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
        }
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,     
        field: 'use_in_menu',
        comment: 'Exibir produto no menu principal'
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,      
        defaultValue: 0,
        validate: {
            min: 0,
            isInt: true
        }
    },
    description: {
        type: DataTypes.STRING(1000),  
        allowNull: true,
        validate: {
            len: [0, 1000]
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01,
            isDecimal: true
        },
        get() {
            const value = this.getDataValue('price');
            return value ? parseFloat(value) : null;
        }
    },
    price_with_discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,  // requisito obrigatorio
        defaultValue: 0,    
        validate: {
            min: 0,
            isDecimal: true,
            isLowerThanPrice(value) {
                if (value && value > 0 && value >= this.price) {
                    throw new Error('Preço com desconto deve ser menor que o preço original');
                }
            }
        },
        get() {
            const value = this.getDataValue('price_with_discount');
            return value ? parseFloat(value) : null;
        }
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            name: 'idx_product_enabled',
            fields: ['enabled']
        },
        {
            name: 'idx_product_slug',
            unique: true,
            fields: ['slug']
        }
    ],
    hooks: {
        beforeValidate: (product) => {
            if (product.name) {
                product.name = product.name.trim();
            }

            if (product.name && !product.slug) {
                product.slug = product.name
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim();
            }

            if (product.slug) {
                product.slug = product.slug.toLowerCase();
            }
        },

        beforeSave: (product) => {
            if (product.price_with_discount && product.price_with_discount >= product.price) {
                product.price_with_discount = 0;  
            }

            if (product.stock < 0) {
                product.stock = 0;
            }
        },

        beforeUpdate: (product) => {
            if (product.changed('enabled') && !product.enabled) {
                product.use_in_menu = false;
            }
        }
    }
});

module.exports = Product;
