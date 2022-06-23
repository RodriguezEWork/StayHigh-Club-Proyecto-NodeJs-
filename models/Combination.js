const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Combination = sequelize.define("Combination", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    band: {
        type: DataTypes.STRING,
    },
    sale_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
    },
    quantity_time_validated: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        modelName: "Combination",
    });

module.exports = {
    Combination,
}