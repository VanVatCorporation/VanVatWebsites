const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/ads.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/ads.txt'));
});

app.use('/', express.static(path.join(__dirname, '../public/van-vat-corporation/landing-page')));
app.use('/privacy-policy', express.static(path.join(__dirname, '../public/van-vat-corporation/privacy-policy')));
app.use('/terms-of-service', express.static(path.join(__dirname, '../public/van-vat-corporation/terms-of-service')));

app.use('/archived-website', express.static(path.join(__dirname, '../public-old')));

// Serve the uploaded files statically
app.use('/FullyPublic', express.static(path.join(__dirname, '../public-res')));

// Serve the uploaded files statically
app.use('/12A1Web', express.static(path.join(__dirname, '../public/12A1Web')));

app.use('/public-res', express.static(path.join(__dirname, '../public-res/res')));


// Disable to tunnel through server.js
//app.use((req, res) => {
//    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
//});


module.exports = app;