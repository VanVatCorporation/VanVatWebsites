const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const app = express();

app.use('/mothernature', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-for-mothernature')));
app.use('/fatherland', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-for-fatherland')));

app.use('/family-ancestors', express.static(path.join(__dirname, '../public/van-vat-corporation/family-ancestors')));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;