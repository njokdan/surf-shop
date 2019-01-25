const passport = require('passport');
const User = require('../models/user');

module.exports = {
    // Registrar usuario
    async postRegister(req, res, next) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        });

        await User.register(newUser, req.body.password);
        res.redirect('/');
    },

    // Login al usuario
    postLogin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })(req, res, next);
    },

    // Logout al usuario
    async getLogout(req, res, next) {
        await req.logout();
        res.redirect('/');
    }
}