const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-archive')));




// API to get list of files
app.get('/time-capsule/photos/:directory', (req, res) => {
    fs.readdir(path.join(__dirname, '../data/van-vat-corporation/van-vat-drive/read-only/', req.params.directory), (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        res.json(files);
    });
});



app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;