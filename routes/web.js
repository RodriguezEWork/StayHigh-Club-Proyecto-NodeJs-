const express = require('express');
const { body } = require('express-validator');
const { loginForm, loginIn, registerIn, registerForm, cerrarSesion } = require('../controller/AuthController');
const { isAuth, isAdmin } = require('../middlewares/isAuth');
const { Role } = require('../models/Role');
const { User } = require('../models/User');
const router = express.Router();
const moment = require('moment');
const { Product } = require('../models/Product');
const { seedPerson } = require('../controller/PageController');

//Home y utilidades publicas
router.get('/', isAuth, async (req, res) => {
    if (req.user.role == 2) {
        res.redirect('/admin');
    }
    if (req.user.role == 3) {
        res.redirect('/seller-products');
    }

    res.render('/index');
});

//Rutas para la sesion
router.get('/login', loginIn)
router.post('/login', [
    body('email', 'Ingrese un Email Valido').trim().isEmail().normalizeEmail(),
    body("password", "Contraseña no cumple el formato").trim().isLength({ min: 4 }).escape(),
], loginForm)
router.get('/register', registerIn)
router.post('/register', [
    body('nombre', 'Ingrese un nombre de Usuario valido').trim().notEmpty().escape(),
    body('email', 'Ingrese un Email Valido').trim().isEmail().normalizeEmail(),
    body("password", "Contraseña con 6 o más carácteres").trim().isLength({ min: 6 }).escape()
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("Password no coinciden");
            } else {
                return value;
            }
        }),
], registerForm)
router.get('/logout', cerrarSesion)

module.exports = router;