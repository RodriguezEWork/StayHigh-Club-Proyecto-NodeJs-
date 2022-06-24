const Sequelize = require('sequelize');

const hosting = process.env.DB_HOST || 'localhost';
const nombre = process.env.DB_NAME || 'nodebar';
const password = process.env.DB_PASS || 'root';
const usuario = process.env.DB_USER || 'root';

const sequelize = new Sequelize(
    nombre,
    usuario,
    password,
    {
        host: hosting,
        dialect: 'mysql',
    }
)

sequelize.authenticate()
    .then(function () {
        console.log('Base de datos conectada correctamente!');
    }, function (err) {
        console.log('Se encontre un error al intentar conectarse:', err);
    });

module.exports = {
    sequelize,
}