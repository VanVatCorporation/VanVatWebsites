const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, '../public/van-vat-corporation/cryptocurrencies/')));
app.use('/en-US', express.static(path.join(__dirname, '../public/van-vat-corporation/cryptocurrencies/index-en-US.html')));
app.use('/vi-VN', express.static(path.join(__dirname, '../public/van-vat-corporation/cryptocurrencies/index-vi-VN.html')));

app.use('/en-US/token-detail', express.static(path.join(__dirname, '../public/van-vat-corporation/cryptocurrencies/token/en-US')));
app.use('/vi-VN/token-detail', express.static(path.join(__dirname, '../public/van-vat-corporation/cryptocurrencies/token/vi-VN')));


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;