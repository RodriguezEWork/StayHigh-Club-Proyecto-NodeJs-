const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const ejs = require('ejs');
const { sequelize } = require('./database/db');
const { User } = require('./models/User');
const moment = require('moment');
const { Cashbox } = require('./models/Cashbox');
require('./models/asociations')
const router = express.Router();

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitiliazed: false,
        name: "StayHighBar"
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(
    (user, done) => done(null, { id: user.id, userName: user.userName })
);

passport.deserializeUser(async (user, done) => {
    const userDB = await User.findByPk(user.id, {
        include: Cashbox,
    });
    return done(null, { id: userDB.id, userName: userDB.name, role: userDB.RoleId, cashbox: userDB.Cashbox?.id || 'Sin caja' });
});

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/web'));
app.use("/admin", require("./routes/admin"));
app.use("/seller-products", require("./routes/seller-products"));
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.status(404).render('404');
    res.locals.moment = moment;
    next();
})

app.listen(5000, (req, res) => {
    console.log('Servidor funcionando')
})

