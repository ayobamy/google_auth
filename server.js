const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
require('./passport');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});

module.exports = app;
