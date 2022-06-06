const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')


router.get('/', function (req, res, next) {
    //####################### ZADATAK #######################
    //vrati login stranicu
        res.render('login', {
            title: 'Login',
            linkActive: 'login',
            user: req.session.user,
            err: undefined,
        });

    //#######################################################

});

router.post('/', function (req, res, next) {
    //####################### ZADATAK #######################
    //postupak prijave korisnika

    (async() => {

        let user = await User.fetchByUsername(req.body.User);

        if (user.id === undefined) {
            res.render('Login', {
                title: 'Login',
                linkActive: 'login',
                user: req.session.user,
                err: 'Undefined username',
            });

            return;
        }

        if (!user.checkPassword(req.body.password)) {
            res.render('Login', {
                title: 'Login',
                linkActive: 'login',
                user: req.session.user,
                err: 'Try again, incorrect password',
            });
            return;
        }

        req.session.user = user;
        res.redirect('/');

    })();

    //#######################################################

});


module.exports = router;