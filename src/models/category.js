const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model {
  async getActiveProductsCount() {
    const ProductCategory = require('./product-category.js');
    const Product = require('./product');

    const productIds = await ProductCategory.findAll({
      where: { category_id: this.id },
      attributes: ['product_id'],
      raw: true
    });
    if (productIds.length === 0) return 0;
    return await Product.count({
      where: {
        id: productIds.map(p => p.product_id),
        enabled: true
      }
    });
  }

  async hasProducts() {
    const ProductCategory = require('./product-category.js');
    const count = await ProductCategory.count({
      where: { category_id: this.id }
    });
    return count > 0;
  }

  static async findMenuCategories() {
    return await this.findAll({
      where: { use_in_menu: true },
      order: [['name', 'ASC']]
    });
  }
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      msg: 'Já existe uma categoria com este nome'
    },
    validate: {
      notEmpty: {
        msg: 'Nome não pode ser vazio'
      },
      len: {
        args: [2, 100],
        msg: 'Nome deve ter entre 2 e 100 caracteres'
      }
    }
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      msg: 'Já existe uma categoria com este slug'
    },
    validate: {
      notEmpty: {
        msg: 'Slug não pode ser vazio'
      },
      is: {
        args: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        msg: 'Slug deve conter apenas letras minúsculas, números e hífens'
      }
    }
  },
  use_in_menu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
    field: 'use_in_menu',
    comment: 'Define se a categoria aparece no menu principal'
  }
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categories',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      name: 'idx_category_use_in_menu',
      fields: ['use_in_menu']
    },
    {
      name: 'idx_category_slug',
      unique: true,
      fields: ['slug']
    }
  ],
  hooks: {
    beforeValidate: (category) => {
      if (category.name) {
        category.name = category.name
          .trim()
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

      if (category.name && !category.slug) {
        category.slug = category.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      }

      if (category.slug) {
        category.slug = category.slug.toLowerCase();
      }
    },

    beforeDestroy: async (category) => {
      const hasProducts = await category.hasProducts();
      if (hasProducts) {
        throw new Error('Não é possível deletar categoria com produtos associados');
      }
    }
  }
});

module.exports = Category;
