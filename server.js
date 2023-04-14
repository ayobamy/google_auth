require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const dbConnect = require('./db');
const router = require('./route');

require('./passport');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server Running on port ${PORT}`);
});

module.exports = app;
