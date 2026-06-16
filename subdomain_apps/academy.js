const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const serveIndex = require('serve-index');
const app = express();

const serveIndexVanVatStudyOptions = { hidden: true, icons: true, stylesheet: path.join(__dirname, '../public-res/res/serveIndex/VanVatStudyServe/style.css'), template: path.join(__dirname, '../public-res/res/serveIndex/VanVatStudyServe/directory.html') };


app.use('/', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-study')));


// Serve the uploaded files statically
app.use('/study/practice-files', express.static(path.join(__dirname, '../data/van-vat-corporation/van-vat-study/StudyDocuments')));
// use serve index to nav public folder
app.use('/study/practice-files', serveIndex(path.join(__dirname, '../data/van-vat-corporation/van-vat-study/StudyDocuments'), serveIndexVanVatStudyOptions));



app.use('/api/active-learning/testbank', express.static(path.join(__dirname, '../data/van-vat-corporation/van-vat-study/active-learning')));







// API to get list of files
app.post('/api/active-learning/upload-multiple-choice-form', (req, res) => {
const { formTitle, formJson } = req.body;

const fullDirectory = `data/van-vat-corporation/van-vat-study/active-learning/${formTitle}.json`;

    fs.mkdirSync(fullDirectory.substring(0, fullDirectory.lastIndexOf("/")), { recursive: true });

    fs.writeFile(fullDirectory, formJson, 'utf8', (err) => {
        if (err)
            logging.consoleLog('Error written to file!');
        logging.consoleLog('Data written to file');
    }); // write it back 


     res.json({
                returnResult: 'Upload successful'
            });


});



app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;