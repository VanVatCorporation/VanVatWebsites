const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const app = express();

app.use('/charity', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-charity')));
app.use('/lifesaver', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-lifesaver')));
app.use('/donate', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-donate')));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;