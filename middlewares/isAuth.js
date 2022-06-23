const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

const isAdmin = (req, res, next) => {
    if (req.user.role == 2) {
        return next();
    }
    res.redirect('/login');
}

module.exports = {
    isAuth,
    isAdmin,
}