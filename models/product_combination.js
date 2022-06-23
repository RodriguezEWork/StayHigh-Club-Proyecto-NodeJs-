const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Product_Combination = sequelize.define("Product_Combination", {
    amount_used: {
        type: DataTypes.INTEGER,
    },
    amount_preparations: {
        type: DataTypes.INTEGER,
    },
},
    {
        modelName: "Product_Combination",
    });

module.exports = {
    Product_Combination,
}