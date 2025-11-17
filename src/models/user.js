const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

class User extends Model {
    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }

    static async findByEmail(email) {
        return await this.scope('withPassword').findOne({
            where: { email: email.toLowerCase() }
        });
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
    surname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Sobrenome não pode ser vazio'
            },
            len: {
                args: [2, 100],
                msg: 'Sobrenome deve ter entre 2 e 100 caracteres'
            }
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
            msg: 'Este email já está cadastrado'
        },
        validate: {
            isEmail: {
                msg: 'Email inválido'
            },
            notEmpty: {
                msg: 'Email não pode ser vazio'
            }
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Senha não pode ser vazia'
            },
            len: {
                args: [6, 255],
                msg: 'Senha deve ter no mínimo 6 caracteres'
            }
        }
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    scopes: {
        withPassword: {
            attributes: { include: ['password'] }
        }
    },
    indexes: [
        {
            name: 'idx_user_email',
            unique: true,
            fields: ['email']
        }
    ],
    hooks: {
        beforeValidate: (user) => {
            if (user.email) {
                user.email = user.email.toLowerCase().trim();
            }
            
            if (user.firstname) {
                user.firstname = user.firstname.trim();
            }
            if (user.surname) {
                user.surname = user.surname.trim();
            }
        },
        beforeSave: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

module.exports = User;
