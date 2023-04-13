require('dotenv').config();
const passport = require("passport");
require("./passportConfig")(passport);
const express = require('express');
const dbConnect = require('./db');
const router = require('./route');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server Running on port ${PORT}`);
});

module.exports = app;
