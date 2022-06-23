const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Box_Product = sequelize.define("Box_Product", {
    stock_inbox: {
        type: DataTypes.FLOAT,
    },
},
    {
        modelName: "Box_Product",
    });

module.exports = {
    Box_Product,
}