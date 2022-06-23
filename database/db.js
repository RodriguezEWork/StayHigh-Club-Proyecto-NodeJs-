const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'NodeBar',
    'root',
    'root',
    {
        host: 'localhost',
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