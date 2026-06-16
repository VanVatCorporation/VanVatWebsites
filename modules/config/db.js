const mysql = require("mysql2");

// Create a connection to the database
const bookSQL = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'viet2007',
    database: 'bookdb'
});
// Create a connection to the database
const accountSQL = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'viet2007',
    database: 'vanvataccounts'
});

// Create a connection to the database
const doubleclipsSQL = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'viet2007',
    database: 'doubleclipsdb'
});


// Create a connection to the database
const sopriseSQL = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'viet2007',
    database: 'soprisedb'
});


// Connect to the database
//sqlPool.connect((err) => {
//    if (err) {
//        console.error('Error connecting to the database:', err.stack);
//        return;
//    }
//    console.log('Connected to the database as id ' + sqlPool.threadId);
//});

module.exports = { bookSQL, accountSQL, doubleclipsSQL, sopriseSQL };
