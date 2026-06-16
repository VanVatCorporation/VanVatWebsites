const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const app = express();

app.use('/music', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-music')));

app.use('/category-music/songs', express.static(path.join(__dirname, '../data/van-vat-corporation/van-vat-music/category-music')));

//       ====================     VanVatMusic     ====================



// API to get list of files
app.get('/api/songs/all-names', (req, res) => {
    fs.readdir(path.join(__dirname, '../data/van-vat-corporation/van-vat-music/category-music'), (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        res.json(files);
    });
});



//       ====================     End VanVatMusic     ====================

// Playground here
app.use('/hls/Rehersal-Train_C-F-Code', express.static(path.join(__dirname, '../data/van-vat-corporation/van-vat-media/hls/Rehersal-Train_C-F-Code')));
// End playground here



app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;