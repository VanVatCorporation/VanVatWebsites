const express = require('express');
const logging = require('../modules/utils/log');
const app = express();

app.use((req, res) => {
    res.redirect(301, "https://www.vanvatcorp.com/");
});
module.exports = app;