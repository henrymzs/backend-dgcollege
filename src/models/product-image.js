const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const path = require('path');
const fs = require('fs').promises;

class ProductImage extends Model {
    getImageUrl(baseUrl = process.env.BASE_URL || 'http://localhost:3000') {
        return `${baseUrl}/${this.path}`;
    }

    async isPrimary() {
        const firstImage = await ProductImage.findOne({
            where: { 
                product_id: this.product_id,
                enabled: true 
            },
            order: [['id', 'ASC']]
        });
        
        return firstImage && firstImage.id === this.id;
    }

    getFileExtension() {
        return path.extname(this.path).toLowerCase();
    }

    isValidImageFormat() {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        return validExtensions.includes(this.getFileExtension());
    }

    static async findByProductId(productId, enabledOnly = true) {
        const where = { product_id: productId };
        
        if (enabledOnly) {
            where.enabled = true;
        }

        return await this.findAll({
            where,
            order: [['id', 'ASC']]
        });
    }

    static async findPrimaryImage(productId) {
        return await this.findOne({
            where: { 
                product_id: productId,
                enabled: true 
            },
            order: [['id', 'ASC']]
        });
    }

    async deleteFile() {
        try {
            const fullPath = path.join(process.cwd(), 'public', this.path);
            await fs.unlink(fullPath);
            console.log(`Arquivo deletado: ${fullPath}`);
        } catch (error) {
            console.error(`Erro ao deletar arquivo: ${error.message}`);
        }
    }
}

ProductImage.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,  
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'product_id',
        comment: 'ID do produto'
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,  
        comment: 'Indica se a imagem está ativa/visível'
    },
    path: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Path não pode ser vazio'
            },
            isValidExtension(value) {
                const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
                const ext = path.extname(value).toLowerCase();
                
                if (!validExtensions.includes(ext)) {
                    throw new Error(`Formato inválido. Use: ${validExtensions.join(', ')}`);
                }
            },
            isSafePath(value) {
                if (value.includes('..') || path.isAbsolute(value)) {
                    throw new Error('Path de imagem inválido por questões de segurança');
                }
            }
        },
        comment: 'Caminho relativo da imagem (ex: uploads/products/img.jpg)'
    }
}, {
    sequelize,
    modelName: 'ProductImage',
    tableName: 'product_images',
    timestamps: false,  
    underscored: true,
    indexes: [
        {
            name: 'idx_product_image_product_id',
            fields: ['product_id']
        },
        {
            name: 'idx_product_image_enabled',
            fields: ['enabled']
        }
    ],
    hooks: {
        beforeValidate: (image) => {
            if (image.path) {
                image.path = image.path.replace(/\\/g, '/');
                image.path = image.path.replace(/\/+/g, '/');
                image.path = image.path.replace(/^\//, '');
            }
        },

        beforeDestroy: async (image) => {
            await image.deleteFile();
        },

        beforeUpdate: async (image) => {
            if (image.changed('path')) {
                const oldPath = image._previousDataValues.path;
                try {
                    const fullPath = path.join(process.cwd(), 'public', oldPath);
                    await fs.unlink(fullPath);
                    console.log(`Arquivo antigo deletado: ${fullPath}`);
                } catch (error) {
                    console.error(`Não foi possível deletar arquivo antigo: ${error.message}`);
                }
            }
        }
    }
});

module.exports = ProductImage;
