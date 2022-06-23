const { User } = require("../models/User");
const bcrypt = require('bcryptjs');
const { request } = require('express');
const { validationResult } = require('express-validator');

const loginIn = (req, res) => {
    res.render('login', { titulo: 'login', layout: 'authmain' });
}

const registerIn = (req, res) => {
    res.render('register', { titulo: 'Registro', layout: 'authmain' });
}

const registerForm = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.redirect('/register')
    }

    const { nombre, email, password, repassword } = req.body;

    try {

        let Usuario = await User.findOne({
            where: {
                email: email,
            }
        })

        if (Usuario) throw new Error('Ya existe un usuario con ese correo');

        Usuario = await User.create({
            name: nombre,
            email: email,
            password: password,
            RoleId: 1
        })

        res.redirect('/login');

    } catch (error) {
        console.log(error)
    }

}

const loginForm = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.redirect('/login')
    }

    try {

        const { email, password } = req.body;

        const Usuario = await User.findOne({
            where: {
                email: email || null,
            }
        })

        if (!Usuario) throw new Error('No existe un usuario con este correo');
        if (!Usuario.confirmAccount) throw new Error('Su cuenta no esta validada');
        if (!bcrypt.compareSync(password, Usuario.password)) throw new Error('La contraseña es incorrecta');

        await req.login(Usuario, function (err) {
            if (err) {
                throw new Error("Error de logueo");
            }
            res.redirect('/');
        });

    } catch (error) {
        console.log(error)
        res.redirect('/login')
    }

}

const cerrarSesion = (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/login");
    });
};

module.exports = {
    loginForm,
    loginIn,
    registerIn,
    registerForm,
    cerrarSesion
}