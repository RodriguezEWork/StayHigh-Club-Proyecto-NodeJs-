const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Ticket = sequelize.define("Ticket", {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    qr_code: {
        type: DataTypes.STRING,
    },
    qr_code_hash: {
        type: DataTypes.STRING,
    },
    valid_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valid_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        modelName: "Ticket",
    });

module.exports = {
    Ticket,
}