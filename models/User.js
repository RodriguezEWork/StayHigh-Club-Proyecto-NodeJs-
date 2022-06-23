const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const bcrypt = require('bcryptjs');
const { Role, Rol } = require('./Role');

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    confirmAccount: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        modelName: "User",
        hooks: {
            beforeCreate: async (User) => {
                if (User.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    User.password = bcrypt.hashSync(User.password, salt);
                }
            },
            beforeUpdate: async (User) => {
                if (User.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    User.password = bcrypt.hashSync(User.password, salt);
                    options.validate = false;
                }
            }
        },
        instanceMethods: {
            validPassword: (password) => {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });

module.exports = {
    User,
}