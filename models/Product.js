const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Product = sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    band: {
        type: DataTypes.STRING,
    },
    stock: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    minimum_stock: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    assigned: {
        type: DataTypes.FLOAT,
    },
    purcharse_price: {
        type: DataTypes.FLOAT,
        allowNull: false
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
        modelName: "Product",
    });

module.exports = {
    Product,
}