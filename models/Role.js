const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Role = sequelize.define("Role", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        modelName: "Role",
    });

module.exports = {
    Role,
}