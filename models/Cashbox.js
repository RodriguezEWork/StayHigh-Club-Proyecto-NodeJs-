const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Cashbox = sequelize.define("Cashbox", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    initial_money: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    money: {
        type: DataTypes.FLOAT,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        modelName: "Cashbox",
    });

module.exports = {
    Cashbox,
}