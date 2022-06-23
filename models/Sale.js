const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Sale = sequelize.define("Sale", {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    operation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ticket_deadline: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
},
    {
        modelName: "Sale",
    });

module.exports = {
    Sale,
}