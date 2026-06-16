const express = require('express');
const logging = require('../modules/utils/log');
const sqlPool = require('../modules/config/db');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const app = express();

app.use('/', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-book')));



app.use('/data/bookstore/', express.static(path.join(__dirname, '../data/van-vat-corporation/van-vat-book')));

//       ====================     VanVatBook     ====================

//let countdowns_UpcomingEvent = [];


//fs.readFile('', 'utf8', (err, data) => {
//    if (err) {
//        logging.consoleError(err);
//        return;
//    }
//    try {
//        countdowns_UpcomingEvent = JSON.parse(data); //now it an object
//    }
//    catch (e) {
//        countdowns_UpcomingEvent = [{
//            id: "none",
//            event: "Ch?a có s? ki?n",
//            time: 142423
//        }];
//    }
//});

async function getTotalPages(pdfPath) {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    //logging.consoleLog(`Total Pages: ${pdfDoc.getPageCount()}`);
    return pdfDoc.getPageCount();
}

async function extractPage(pdfPath, pageNumber, outputPath) {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const [extractedPage] = await pdfDoc.copyPages(pdfDoc, [pageNumber - 1]); // Zero-based index
    const newPdfDoc = await PDFDocument.create();
    newPdfDoc.addPage(extractedPage);
    const newPdfBytes = await newPdfDoc.save();
    fs.writeFileSync(outputPath, newPdfBytes);
    logging.consoleLog(`Page ${pageNumber} extracted to ${outputPath}`);
}





// Register Route
//app.post('/api/merge', (req, res) => {
//    const { accountUsername, accountPassword } = req.body;
//    //const hashedPassword = bcrypt.hashSync(accountPassword, 12);

//    const query = 'INSERT INTO users (accountUsername, accountPassword) VALUES (?, ?)';
//    sqlPool.accountSQL.query(query, [accountUsername, /*hashedPassword*/accountPassword], (err, result) => {
//        if (err)
//            logging.consoleError(err);
//        res.send('User merged successfully');
//    });
//});

// Login Route
app.post('/api/login', (req, res) => {
    const { accountUsername, accountPassword } = req.body;

    const query = 'SELECT * FROM users WHERE accountUsername = ?';
    sqlPool.accountSQL.query(query, [accountUsername], (err, results) => {
        if (err)
            logging.consoleError(err);

        if (typeof results === 'undefined') {
            return res.status(400).json({ returnResult: 'Undefined' });
        }
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(accountPassword, user.accountPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ returnResult: 'Invalid password' });
        }

        const insertIgnoreQuery = `
  INSERT IGNORE INTO users_book (accountUUID, accountData, boughtAssets, accountStatistics) VALUES (?, ?, ?, ?);
`;

        const userData = [user.accountUUID, "{}", "{}", "{}"]; // Replace with actual values

        sqlPool.accountSQL.query(insertIgnoreQuery, userData, (err, results) => {
            if (err) {
                logging.consoleError('Error inserting/updating data:', err);
                res.json({
                    returnResult: 'Upload failed'
                });
                return;
            }
            //logging.consoleLog('User data successfully handled:', results);
        });



        res.json({
            returnResult: 'Login successful',
            accountUUID: user.accountUUID,
            accountUsername: user.accountUsername,
            accountPassword: "-",
            accountEmail: user.accountEmail,
            firstName: user.firstName,
            lastName: user.lastName,
            legalBirthday: new Date(user.legalBirthday).getTime(),
            gender: user.gender
        });
    });
});

// Login Route
app.post('/api/upload-account-data', (req, res) => {
    const { accountUsername, accountPassword, accountDataJson, accountStatisticsJson } = req.body;

    const query = 'SELECT * FROM users WHERE accountUsername = ?';
    sqlPool.accountSQL.query(query, [accountUsername], (err, results) => {
        if (err)
            logging.consoleError(err);

        if (typeof results === 'undefined') {
            return res.status(400).json({ returnResult: 'Undefined' });
        }
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(accountPassword, user.accountPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ returnResult: 'Invalid password' });
        }

        const insertOrUpdateQuery = `
  INSERT INTO users_book (accountUUID, accountData, accountStatistics)
  VALUES (?, ?, ?) 
  ON DUPLICATE KEY UPDATE accountUUID = VALUES(accountUUID), accountData = VALUES(accountData), accountStatistics = VALUES(accountStatistics);
`;

        const userData = [user.accountUUID, accountDataJson, accountStatisticsJson]; // Replace with actual values

        sqlPool.accountSQL.query(insertOrUpdateQuery, userData, (err, results) => {
            if (err) {
                logging.consoleError('Error inserting/updating data:', err);
                res.json({
                    returnResult: 'Upload failed'
                });
                return;
            }
            //logging.consoleLog('User data successfully handled:', results);
        });


        res.json({
            returnResult: 'Upload successful'
        });
    });
});

// Login Route
app.post('/api/download-account-data', (req, res) => {
    const { accountUsername, accountPassword } = req.body;

    const query = 'SELECT * FROM users WHERE accountUsername = ?';
    sqlPool.accountSQL.query(query, [accountUsername], (err, results) => {
        if (err)
            logging.consoleError(err);


        if (typeof results === 'undefined') {
            return res.status(400).json({ returnResult: 'Undefined' });
        }
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(accountPassword, user.accountPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ returnResult: 'Invalid password' });
        }



        const insertOrUpdateQuery = `
  SELECT 
    b.accountUUID, b.accountData, b.boughtAssets, b.accountStatistics
  FROM users_book b WHERE accountUUID = ?`;

        const userData = [user.accountUUID]; // Replace with actual values

        sqlPool.accountSQL.query(insertOrUpdateQuery, userData, (err, results1) => {
            if (err) {
                logging.consoleError('Error inserting/updating data:', err);
                res.json({
                    returnResult: 'Upload failed'
                });
                return;
            }
            if (results1.length === 0) {
                return res.status(400).json({ returnResult: 'UUID not found' });
            }

            const user = Object.assign({}, results1[0].accountData, results1[0].boughtAssets, results1[0].accountStatistics);
            res.json({
                returnResult: 'Download successful',
                accountData: user
            });


            //logging.consoleLog('User data successfully handled:', results1);
        });


    });
});



// Login Route
app.post('/api/buy-assets/:bookid/:chapterid', (req, res) => {
    const { accountUsername, accountPassword } = req.body;

    const query = 'SELECT * FROM users WHERE accountUsername = ?';
    sqlPool.accountSQL.query(query, [accountUsername], (err, results) => {
        if (err)
            logging.consoleError(err);


        if (typeof results === 'undefined') {
            return res.status(400).json({ returnResult: 'Undefined' });
        }
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(accountPassword, user.accountPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ returnResult: 'Invalid password' });
        }


        const query1 = 'SELECT b.boughtAssets FROM users_book b WHERE accountUUID = ?';
        sqlPool.accountSQL.query(query1, [user.accountUUID], (err, results0) => {
            if (err)
                logging.consoleError(err);

            if (typeof results0 === 'undefined') {
                return res.status(400).json({ returnResult: 'Undefined' });
            }
            if (results0.length === 0) {
                return res.status(400).json({ returnResult: 'User not found' });
            }




            const insertOrUpdateQuery = `
  INSERT INTO users_book (accountUUID, boughtAssets)
  VALUES (?, ?) 
  ON DUPLICATE KEY UPDATE accountUUID = VALUES(accountUUID), boughtAssets = VALUES(boughtAssets);
`;


            //var oldBoughtAssets = results0[0].boughtAssets;

            //if (typeof oldBoughtAssets === 'undefined') {
            //    oldBoughtAssets = {
            //        boughtAssets:
            //        {
            //            bookChapterBought: {
            //                [req.params.bookid]: []
            //            }
            //        }
            //    }
            //}
            //if (oldBoughtAssets === null) {
            //    oldBoughtAssets = {
            //        boughtAssets:
            //        {
            //            bookChapterBought: {
            //                [req.params.bookid]: []
            //            }
            //        }
            //    }
            //}
            //if (typeof oldBoughtAssets.boughtAssets.bookChapterBought === 'undefined') {
            //    oldBoughtAssets = {
            //        boughtAssets:
            //        {
            //            bookChapterBought: {
            //                [req.params.bookid]: []
            //            }
            //        }
            //    }
            //}
            //if (oldBoughtAssets.boughtAssets.bookChapterBought.length === 0) {
            //    oldBoughtAssets = {
            //        boughtAssets:
            //        {
            //            bookChapterBought: {
            //                [req.params.bookid]: []
            //            }
            //        }
            //    }
            //}

            //if (typeof oldBoughtAssets.boughtAssets.bookChapterBought[req.params.bookid] === 'undefined') {
            //    oldBoughtAssets.boughtAssets.bookChapterBought[req.params.bookid] = [
            //        req.params.chapterid
            //    ]
            //}
            //else
            //    oldBoughtAssets.boughtAssets.bookChapterBought[req.params.bookid].push(req.params.chapterid);


            let oldBoughtAssets = results0[0].boughtAssets || {
                boughtAssets: { bookChapterBought: {} }
            };

            oldBoughtAssets.boughtAssets.bookChapterBought[String(req.params.bookid)] ??= [];
            oldBoughtAssets.boughtAssets.bookChapterBought[String(req.params.bookid)].push(String(req.params.chapterid));


            //const testInsertBoughtAssets = `{"boughtAssets": { "bookChapterBought": { "${req.params.bookid}": [${req.params.chapterid}] } } }`

            const userData = [user.accountUUID, JSON.stringify(oldBoughtAssets)]; // Replace with actual values

            sqlPool.accountSQL.query(insertOrUpdateQuery, userData, (err, results1) => {
                if (err) {
                    logging.consoleError('Error inserting/updating data:', err);
                    res.json({
                        returnResult: 'Upload failed'
                    });
                    return;
                }
                //logging.consoleLog('User data successfully handled:', results);


                const selectQuery = `
  SELECT 
    b.accountUUID, b.accountData, b.boughtAssets, b.accountStatistics
  FROM users_book b WHERE accountUUID = ?`;

                const userData1 = [user.accountUUID]; // Replace with actual values

                sqlPool.accountSQL.query(selectQuery, userData1, (err, results2) => {
                    if (err) {
                        logging.consoleError('Error inserting/updating data:', err);
                        res.json({
                            returnResult: 'Upload failed'
                        });
                        return;
                    }
                    if (results2.length === 0) {
                        return res.status(400).json({ returnResult: 'UUID not found' });
                    }

                    const user = Object.assign({}, results2[0].accountData, results2[0].boughtAssets);
                    res.json({
                        returnResult: 'Download successful',
                        accountData: user
                    });


                    //logging.consoleLog('User data successfully handled:', results1);
                });




            });






        });



    });
});






// Login Route
app.post('/api/download-assets/:bookid/:chapterid', (req, res) => {
    const { accountUsername, accountPassword } = req.body;

    const query = 'SELECT * FROM users WHERE accountUsername = ?';
    sqlPool.accountSQL.query(query, [accountUsername], (err, results) => {
        if (err)
            logging.consoleError(err);


        if (typeof results === 'undefined') {
            return res.status(400).json({ returnResult: 'Undefined' });
        }
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(accountPassword, user.accountPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ returnResult: 'Invalid password' });
        }

        const selectQuery = `
  SELECT 
    b.accountUUID, b.accountData, b.boughtAssets, b.accountStatistics
  FROM users_book b WHERE accountUUID = ?`;

        const userData = [user.accountUUID]; // Replace with actual values

        sqlPool.accountSQL.query(selectQuery, userData, (err, results2) => {
            if (err) {
                logging.consoleError('Error inserting/updating data:', err);
                res.json({
                    returnResult: 'Upload failed'
                });
                return;
            }
            if (typeof results2 === 'undefined') {
                return res.status(400).json({ returnResult: 'Undefined' });
            }
            if (results2.length === 0) {
                return res.status(400).json({ returnResult: 'UUID not found' });
            }

            const user1 = results2[0].accountData;
            const userBought = results2[0].boughtAssets;


            if (!userBought?.boughtAssets?.bookChapterBought?.[String(req.params.bookid)]?.includes(String(req.params.chapterid))) {
                return res.status(400).json({ returnResult: 'Download not allowed!' });
            }
            res.json({
                returnResult: 'Download successful'
            });


            //logging.consoleLog('User data successfully handled:', results1);
        });


    });
});


app.post('/api/submit-streak', (req, res) => {
    const { accountUsername, accountPassword } = req.body;

    const query = 'SELECT * FROM users WHERE accountUsername = ?';
    sqlPool.accountSQL.query(query, [accountUsername], (err, results) => {
        if (err)
            logging.consoleError(err);


        if (typeof results === 'undefined') {
            return res.status(400).json({ returnResult: 'Undefined' });
        }
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(accountPassword, user.accountPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ returnResult: 'Invalid password' });
        }


        const query1 = 'SELECT b.boughtAssets FROM users_book b WHERE accountUUID = ?';
        sqlPool.accountSQL.query(query1, [user.accountUUID], (err, results0) => {
            if (err)
                logging.consoleError(err);

            if (typeof results0 === 'undefined') {
                return res.status(400).json({ returnResult: 'Undefined' });
            }
            if (results0.length === 0) {
                return res.status(400).json({ returnResult: 'User not found' });
            }




            const insertOrUpdateQuery = `
  INSERT INTO users_book (accountUUID, boughtAssets)
  VALUES (?, ?) 
  ON DUPLICATE KEY UPDATE accountUUID = VALUES(accountUUID), boughtAssets = VALUES(boughtAssets);
`;


            let oldBoughtAssets = results0[0].boughtAssets || {
                boughtAssets: { bookChapterBought: {} }
            };

            oldBoughtAssets.boughtAssets.bookChapterBought[String(req.params.bookid)] ??= [];
            oldBoughtAssets.boughtAssets.bookChapterBought[String(req.params.bookid)].push(String(req.params.chapterid));


            const userData = [user.accountUUID, JSON.stringify(oldBoughtAssets)]; // Replace with actual values

            sqlPool.accountSQL.query(insertOrUpdateQuery, userData, (err, results1) => {
                if (err) {
                    logging.consoleError('Error inserting/updating data:', err);
                    res.json({
                        returnResult: 'Upload failed'
                    });
                    return;
                }
                //logging.consoleLog('User data successfully handled:', results);


                const selectQuery = `
  SELECT 
    b.accountUUID, b.accountData, b.boughtAssets, b.accountStatistics
  FROM users_book b WHERE accountUUID = ?`;

                const userData1 = [user.accountUUID]; // Replace with actual values

                sqlPool.accountSQL.query(selectQuery, userData1, (err, results2) => {
                    if (err) {
                        logging.consoleError('Error inserting/updating data:', err);
                        res.json({
                            returnResult: 'Upload failed'
                        });
                        return;
                    }
                    if (results2.length === 0) {
                        return res.status(400).json({ returnResult: 'UUID not found' });
                    }

                    const user = Object.assign({}, results2[0].accountData, results2[0].boughtAssets);
                    res.json({
                        returnResult: 'Download successful',
                        accountData: user
                    });


                    //logging.consoleLog('User data successfully handled:', results1);
                });




            });






        });



    });
});










// API to get list of files
app.get('/api/fetch-books', (req, res) => {
    //for (const a of countdowns_UpcomingEvent) {
    //    if (req.params.eventID === a.id) {
    //        res.json({
    //            eventWrapped: a
    //        });
    //        return;
    //    }
    //}





    (async () => {


        const query = `
  SELECT 
    b.bookId, b.bookTitle, b.bookAuthor, b.bookPublisher, 
    b.bookDescription, b.bookUrl, b.bookDate, b.bookAgeRestriction,
    c.chapterId, c.chapterName, c.chapterDescription, c.chapterUrl, c.chapterPages, c.chapterSize, c.chapterPriceVND
  FROM booksdata b
  LEFT JOIN bookchapters c ON b.bookId = c.bookId ORDER BY c.chapterId`;

        sqlPool.bookSQL.query(query, (error, results) => {
            if (error) {
                logging.consoleError('Error executing query:', error);
                return;
            }

            const books = {};

            results.forEach(row => {
                if (!books[row.bookId]) {
                    books[row.bookId] = {
                        bookId: row.bookId,
                        bookTitle: row.bookTitle,
                        bookAuthor: row.bookAuthor,
                        bookPublisher: row.bookPublisher,
                        bookDescription: row.bookDescription,
                        bookUrl: row.bookUrl,
                        bookDate: row.bookDate,
                        bookAgeRestriction: row.bookAgeRestriction,
                        bookChapters: []
                    };
                }

                if (row.chapterId) {
                    books[row.bookId].bookChapters.push({
                        chapterId: row.chapterId,
                        chapterName: row.chapterName,
                        chapterDescription: row.chapterDescription,
                        chapterUrl: row.chapterUrl,
                        chapterPages: row.chapterPages,
                        chapterSize: row.chapterSize,
                        chapterPriceVND: row.chapterPriceVND
                    });
                }
            });
            //logging.consoleLog(Object.values(books));
            res.json(Object.values(books));


        });

    })();

});


//extractPage('path/to/your/file.pdf', 2, 'output.pdf');

//       ====================     End VanVatBook     ====================

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;