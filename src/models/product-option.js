const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProductOption extends Model {
    getValuesArray() {
        if (!this.values) return [];
        return this.values.split(',').map(v => v.trim()).filter(Boolean);
    }

    isColorOption() {
        return this.type === 'color';
    }

    isTextOption() {
        return this.type === 'text';
    }

    static async findByProductId(productId) {
        return await this.findAll({
            where: { product_id: productId },
            order: [['id', 'ASC']]
        });
    }

    isValidValue(value) {
        const validValues = this.getValuesArray();
        return validValues.includes(value);
    }
}

ProductOption.init({
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
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Título não pode ser vazio'
            },
            len: {
                args: [2, 100],
                msg: 'Título deve ter entre 2 e 100 caracteres'
            }
        },
        comment: 'Título da opção (ex: Tamanho, Cor)'
    },
    shape: {
        type: DataTypes.ENUM('square', 'circle'),
        defaultValue: 'square',
        allowNull: true,
        comment: 'Formato visual da opção'
    },
    radius: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
        validate: {
            min: {
                args: [0],
                msg: 'Raio não pode ser negativo'
            },
            max: {
                args: [100],
                msg: 'Raio não pode ser maior que 100'
            },
            isInt: {
                msg: 'Raio deve ser um número inteiro'
            }
        },
        comment: 'Raio de borda em pixels (usado com shape)'
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        defaultValue: 'text',
        allowNull: true,
        comment: 'Tipo de visualização da opção'
    },
    values: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Valores não podem ser vazios'
            },
            hasValues(value) {
                const values = value.split(',').map(v => v.trim()).filter(Boolean);
                if (values.length === 0) {
                    throw new Error('Deve ter pelo menos um valor');
                }
            },
            validColorFormat(value) {
                if (this.type === 'color') {
                    const colors = value.split(',').map(v => v.trim()).filter(Boolean);
                    const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

                    colors.forEach(color => {
                        if (!hexRegex.test(color)) {
                            throw new Error(`Cor inválida: ${color}. Use formato hexadecimal (#RGB ou #RRGGBB)`);
                        }
                    });
                }
            }
        },
        comment: 'Valores separados por vírgula (ex: "P,M,G" ou "#FF0000,#00FF00")'
    }
}, {
    sequelize,
    modelName: 'ProductOption',
    tableName: 'product_options',
    timestamps: false,
    underscored: true,
    indexes: [
        {
            name: 'idx_product_option_product_id',
            fields: ['product_id']
        }
    ],
    hooks: {
        beforeValidate: (option) => {
            if (option.title) {
                option.title = option.title.trim();
                option.title = option.title.charAt(0).toUpperCase() + option.title.slice(1);
            }

            if (option.values) {
                option.values = option.values
                    .split(',')
                    .map(v => v.trim())
                    .filter(Boolean)
                    .join(',');
            }

            if (option.type === 'text') {
                option.shape = 'square';
                option.radius = 0;
            }
        },

        beforeSave: (option) => {
            if (option.shape === 'square') {
                option.radius = 0;
            }

            if (option.type === 'color') {
                option.values = option.values.toUpperCase();
            }
        }
    }
});

module.exports = ProductOption;
