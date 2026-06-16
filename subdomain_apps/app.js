const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const app = express();

const doubleclips = require('./app/double-clips.js')

app.use('/', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-app')));

app.get('/app-ads.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/app-ads.txt'));
});


// Mount double-clips router at /double-clips
app.use('/doubleclips', doubleclips);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;


