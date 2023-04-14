require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const dbConnect = require('./db');
require('./passport');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({message: 'You are not logged in'});
});

app.get('/failed', (req, res) => {
    res.send('Failed');
});

app.get('/success', isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.email}`);
});

app.get('/auth/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success');
    }
);

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        req.logout();
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server Running on port ${PORT}`);
});

module.exports = app;
