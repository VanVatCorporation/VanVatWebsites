const express = require('express');
const solarLunar = require("solarLunar");
const sqlPool = require('../modules/config/db');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the api subdomain!');
});
app.get('/restart-server', (req, res) => {
    //Authenticate before restarting...
    res.send("Restarting...");
    restartServers();
});

app.get('/temp-update-db-book', (req, res) => {
        
        for(var i = 13; i < 20; i++)
        {
            
            const insertOrUpdateQuery = `
  INSERT INTO bookchapters (bookId,
    chapterId, chapterName, chapterDescription, chapterUrl, chapterPages, chapterSize, chapterPriceVND)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
  ON DUPLICATE KEY UPDATE bookId = VALUES(bookId), chapterId = VALUES(chapterId), chapterName = VALUES(chapterName),
        chapterDescription = VALUES(chapterDescription), chapterUrl = VALUES(chapterUrl),
        chapterPages = VALUES(chapterPages), chapterSize = VALUES(chapterSize), chapterPriceVND = VALUES(chapterPriceVND);
`;
        
            (async () => {
            const userData = [4, i, `Tập ${i}`, `Tập ${i}`, `https://books.vanvatcorp.com/data/bookstore/conan-tham-tu-lung-danh/chapters/${i}/`, 0, 0, 0]; // Replace with actual values

            sqlPool.bookSQL.query(insertOrUpdateQuery, userData, (err, results) => {
                if (err) {
                    logging.consoleError('Error inserting/updating data:', err);
                    res.send('Upload failed');
                    return;
                }
            
            

            });    
    })();
            
            
            
        }
        res.send('Upload successed');
    
    
    
    

});

app.get('/temp-delete-db-book', (req, res) => {
        
        for(var i = 13; i < 20; i++)
        {
            
            const insertOrUpdateQuery = `
            DELETE FROM bookchapters WHERE chapterId = ?;
`;
        
            (async () => {
            const userData = [i]; // Replace with actual values

            sqlPool.bookSQL.query(insertOrUpdateQuery, userData, (err, results) => {
                if (err) {
                    logging.consoleError('Error inserting/updating data:', err);
                    res.send('Delete failed');
                    return;
                }
            
            

            });    
    })();
            
            
            
        }
        res.send('Delete successed');
    
    
    
    

});




function restartServers() {
    //process.exitCode = 0;
    process.exit(1); // exits with error code
}










//       --!--     TOPSECURE    --!--

let TOPSECURE_memorialdays = [];
fs.readFile('api/family/memorialdays.txt', 'utf8', (err, data) => {
    if (err) {
        logging.consoleError(err);
        return;
    }
    try {
        TOPSECURE_memorialdays = JSON.parse(data);
    }
    catch (e) {
        logging.consoleError(e);
        TOPSECURE_memorialdays = [];
    }
});
function TOPSECURE_getAncestors() {

    let currentDate = new Date();
    let a = [];
    for (const ass of TOPSECURE_memorialdays) {
        let solarDate = solarLunar.lunar2solar(currentDate.getFullYear(), ass.lunarMonth, ass.lunarDay);
        a.push({
            lunar:
            {
                day: ass.lunarDay,
                month: ass.lunarMonth,
                year: currentDate.getFullYear()
            },

            solar:
            {
                day: solarDate.cDay,
                month: solarDate.cMonth,
                year: solarDate.cYear
            },

            ancestorInfo:
            {
                name: ass.ancestorName,
                relationship: ass.ancestorRelationship,
                buryLocation: ass.ancestorBuryLocation,
                additionalNote: ass.ancestorAdditionalNote
            }
        });
    }

    return a;
}


app.get('/family-api/memorial-days', (req, res) => {

    const data = TOPSECURE_getAncestors();


    res.json(data);
});
app.get('/family-api/memorial-days/lunar/day-lookup/:lunar-day', (req, res) => {

    const data = TOPSECURE_getAncestors();
    let dataSend = []

    for (const innerData of data) {
        if (innerData.lunar.day == req.params.lunarDay)
            dataSend.push(innerData);
    }

    res.json(dataSend);
});

app.get('/family-api/memorial-days/solar/day-lookup/:solar-day', (req, res) => {

    const data = TOPSECURE_getAncestors();
    let dataSend = []

    for (const innerData of data) {
        if (innerData.solar.day == req.params.solarDay)
            dataSend.push(innerData);
    }

    res.json(dataSend);
});
app.get('/family-api/memorial-days/lunar/month-lookup/:lunar-month', (req, res) => {

    const data = TOPSECURE_getAncestors();
    let dataSend = []

    for (const innerData of data) {
        if (innerData.lunar.month == req.params.lunarMonth)
            dataSend.push(innerData);
    }

    res.json(dataSend);
});
app.get('/family-api/memorial-days/solar/month-lookup/:solar-month', (req, res) => {

    const data = TOPSECURE_getAncestors();
    let dataSend = []

    for (const innerData of data) {
        if (innerData.solar.month == req.params.solarMonth)
            dataSend.push(innerData);
    }

    res.json(dataSend);
});
app.get('/family-api/memorial-days/lunar/day-month-lookup/:lunar-day/:lunar-month', (req, res) => {

    const data = TOPSECURE_getAncestors();
    let dataSend = []

    for (const innerData of data) {
        if (innerData.lunar.day == req.params.lunarDay && innerData.lunar.month == req.params.lunarMonth)
            dataSend.push(innerData);
    }

    res.json(dataSend);
});
app.get('/family-api/memorial-days/solar/day-month-lookup/:solar-day/:solar-month', (req, res) => {

    const data = TOPSECURE_getAncestors();
    let dataSend = []

    for (const innerData of data) {
        if (innerData.solar.day == req.params.solarDay && innerData.solar.month == req.params.solarMonth)
            dataSend.push(innerData);
    }

    res.json(dataSend);
});
app.get('/family-api/memorial-days/name-lookup/:name', (req, res) => {

    const data = TOPSECURE_getAncestors();
    let dataSend = []

    for (const innerData of data) {
        if (innerData.ancestorInfo.name === req.params.name)
            dataSend.push(innerData);
    }

    res.json(dataSend);
});


app.get('/family-api/today-lunar', (req, res) => {
    let a = "";
    let date = new Date();
    let solarDate = solarLunar.lunar2solar(date.getFullYear(), date.getMonth() + 1, date.getDate());
    let lunarDate = solarLunar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());

    a += "currentDate " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ".";
    a += "\n";
    a += "lunar2solar" + solarDate.cDay + "/" + solarDate.cMonth + "/" + solarDate.cYear + "-" + solarDate.animal;
    a += "\n";
    a += "solar2lunar" + lunarDate.lDay + "/" + lunarDate.lMonth + "/" + lunarDate.lYear + "-" + lunarDate.animal;

    res.json({
        text: a
    });
});


//       --!--     End TOPSECURE     --!--

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});



module.exports = app;
