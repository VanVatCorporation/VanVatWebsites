const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const app = express();


app.use('/', express.static(path.join(__dirname, '../public/van-vat-corporation/services')));
app.use('/transport', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-transport')));
app.use('/online', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-online')));












//       -----     Online Text     -----


let onlineTextContent = "";


fs.readFile('data/global_OnlineText.txt', 'utf8', (err, data) => {
    if (err) {
        logging.consoleError(err);
        return;
    }
    try {
        onlineTextContent = data; //now it an object
    }
    catch (e) {
        onlineTextContent = "";
    }
});

// API to get list of files
app.get('/api/Global/OnlineText/RetrieveText', (req, res) => {
    res.json({
        text: onlineTextContent
    });
});



app.post('/api/Global/OnlineText/SubmitText', (req, res) => {

    const { text } = req.body;
    onlineTextContent = text;


    fs.writeFile('data/global_OnlineText.txt', text, 'utf8', (err) => {
        if (err)
            logging.consoleLog('Error written to file!');
        logging.consoleLog('Data written to file');
    }); // write it back 
});

app.post('/api/Global/OnlineText/SaveText', (req, res) => {

    const { text, directory } = req.body;
    onlineTextContent = text;
    const fullDirectory = `data/Uploader/uploads/${directory}.txt`;

    fs.mkdirSync(fullDirectory.substring(0, fullDirectory.lastIndexOf("/")), { recursive: true });

    fs.writeFile(fullDirectory, text, 'utf8', (err) => {
        if (err)
            logging.consoleLog('Error written to file!');
        logging.consoleLog('Data written to file');
    }); // write it back 
});

app.post('/api/Global/OnlineText/ReadText', (req, res) => {

    const { directory } = req.body;
    const fullDirectory = `data/Uploader/uploads/${directory}.txt`;


    fs.readFile(fullDirectory, 'utf8', (err, data) => {
        if (err) {
            logging.consoleError(err);
            return;
        }
        try {
            onlineTextContent = data; //now it an object
        }
        catch (e) {
            onlineTextContent = "";
        }
    });

    res.json({ returnCode: 200 });
});


//       -----     End Online Text     -----


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});


module.exports = app;