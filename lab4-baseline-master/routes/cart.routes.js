const express = require('express');
const router = express.Router();
const cart = require('../models/CartModel')
const cartSanitizer = require('./helpers/cart-sanitizer');

// Ulančavanje funkcija međuopreme
router.get('/', cartSanitizer, function (req, res, next) {
    //####################### ZADATAK #######################
    // prikaz košarice uz pomoć cart.ejs
        res.render('cart', {
            title: 'Cart',
            linkActive: 'cart',
            user: req.session.user,
            history:req.session.history,
            cart: req.session.cart,
            err: undefined,
        });

    //#######################################################
});


router.get('/add/:id', function (req, res, next) {
    //####################### ZADATAK #######################
    //dodavanje jednog artikla u košaricu

    (async () => {
        await cart.addItemToCart(req.session.cart, req.params.id, 1);

        if (req.session.user) {
            req.app.userData.store();
        }

        res.end();
    })();

    //#######################################################


});

router.get('/remove/:id', function (req, res, next) {
    //####################### ZADATAK #######################
    //brisanje jednog artikla iz košarice
    (async () => {
        await cart.removeItemFromCart(req.session.cart, req.params.id, 1);

        if (req.session.user) {
            req.app.userData.store();
        }

        res.end();
    })();
    //#######################################################


});

module.exports = router;