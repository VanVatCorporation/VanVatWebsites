const http = require('http');
const https = require("https");
const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const serveIndex = require('serve-index');
const si = require('systeminformation');
const busboy = require('connect-busboy');
const uuidGen = require('uuid');
const firebaseAdmin = require("firebase-admin");

const { slowDown } = require('express-slow-down');
const { PDFDocument } = require('pdf-lib');
const { Throttle } = require('stream-throttle');

const encryptionJob = require('./modules/encryptionJob');
const authRoutes = require('./modules/routes/auth');
const sqlPool = require('./modules/config/db');
const logging = require('./modules/utils/log');
/*const { Throttle, ThrottleGroup } = require("stream-throttle");*/

const vhost = require('vhost');
const cookieParser = require('cookie-parser');


const serviceFirebaseAccount = require("./vilitext-firebase-adminsdk-w1w31-be8bae1e00.json");

const firebase = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceFirebaseAccount)
});


const app = express();

const academyApp = require('./subdomain_apps/academy');
const accountApp = require('./subdomain_apps/account');
const aiApp = require('./subdomain_apps/ai');
const apiApp = require('./subdomain_apps/api');
const appApp = require('./subdomain_apps/app');
const archiveApp = require('./subdomain_apps/archive');
const autoApp = require('./subdomain_apps/auto');
const booksApp = require('./subdomain_apps/books');
const cryptoApp = require('./subdomain_apps/crypto');
const donateApp = require('./subdomain_apps/donate');
const driveApp = require('./subdomain_apps/drive');
const healthcareApp = require('./subdomain_apps/healthcare');
const mediaApp = require('./subdomain_apps/media');
const miscApp = require('./subdomain_apps/misc');
const servicesApp = require('./subdomain_apps/services');
const socialApp = require('./subdomain_apps/social');
const sopriseApp = require('./subdomain_apps/soprise');
const travelApp = require('./subdomain_apps/travel');
const wwwApp = require('./subdomain_apps/www');
const redirectApp = require('./subdomain_apps/other');



// Prevent XSS attack (HTML injection)
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy",
        "default-src 'self' *.vanvatcorp.com; " +
        "script-src 'self' *.vanvatcorp.com 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com/ https://cdn.tailwindcss.com/; " +
        "script-src-elem 'self' *.vanvatcorp.com 'unsafe-inline' https://ep2.adtrafficquality.google/sodar/sodar2.js https://pagead2.googlesyndication.com/ https://cdn.tailwindcss.com/; " +
        "style-src 'self' *.vanvatcorp.com 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com/; " +
        "font-src 'self' *.vanvatcorp.com https://fonts.gstatic.com/ https://cdnjs.cloudflare.com/; " +
        "connect-src 'self' *.vanvatcorp.com https://pagead2.googlesyndication.com/ https://ep1.adtrafficquality.google/; " +
        "frame-src 'self' *.vanvatcorp.com https://googleads.g.doubleclick.net/ https://ep2.adtrafficquality.google/ https://www.google.com/; " +
        "img-src 'self' *.vanvatcorp.com data: https://pagead2.googlesyndication.com/ https://ep1.adtrafficquality.google/ https://storage.googleapis.com/ https://upload.wikimedia.org/ https://api.vietqr.io/ ;"
    );
    // ✅ Set CORS headers dynamically for subdomains
    const origin = req.headers.origin;
    if (origin && (origin === 'https://vanvatcorp.com' || /^https:\/\/(.*)\.vanvatcorp\.com$/.test(origin))) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
    } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    next();
});
// Get total bandwidth usage
//app.use((req, res, next) => {
//    // 🌐 Get client IP
//    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//    logging.consoleLog(`Client IP: ${ip}`);

//    // 📥 Track bytes received
//    let receivedBytes = 0;
//    req.on('data', chunk => {
//        receivedBytes += chunk.length;
//    });

//    req.on('end', () => {
//        logging.consoleLog(`Received: ${receivedBytes} bytes`);
//    });

//    // 📤 Track bytes sent
//    let sentBytes = 0;
//    const originalWrite = res.write;
//    const originalEnd = res.end;

//    res.write = function (chunk, encoding, callback) {
//        if (chunk) sentBytes += Buffer.byteLength(chunk, encoding);
//        return originalWrite.call(this, chunk, encoding, callback);
//    };

//    res.end = function (chunk, encoding, callback) {
//        if (chunk) sentBytes += Buffer.byteLength(chunk, encoding);
//        logging.consoleLog(`Sent: ${sentBytes} bytes`);
//        return originalEnd.call(this, chunk, encoding, callback);
//    };

//    next();
//});

// -----------------------------------------------------   Logging Bandwidth Usage


// Bandwidth accumulator
const bandwidthMap = new Map();

// Flush to DB every 60 seconds
setInterval(async () => {
    if (bandwidthMap.size === 0) return;

    let conn;
    try {
        //conn = await sqlPool.accountSQL.getConnection();

        conn = sqlPool.accountSQL;

        for (const [key, data] of bandwidthMap.entries()) {
            const [ip, hostname] = key.split('|');

            await conn.promise().query(`
    INSERT INTO bandwidth_usage (ip, hostname, bandwidthByteSent, bandwidthByteReceive)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      bandwidthByteSent = bandwidthByteSent + VALUES(bandwidthByteSent),
      bandwidthByteReceive = bandwidthByteReceive + VALUES(bandwidthByteReceive)
  `, [ip, hostname, data.sent, data.received]);
        }


        bandwidthMap.clear(); // Reset in-memory buffer
        logging.consoleLog(`[${new Date().toISOString()}] Flushed bandwidth data to DB`);
    } catch (err) {
        logging.consoleError('Flush failed:', err);
    } finally {
        //if (conn) conn.release();
    }
}, 60 * 1000); // ⏱️ 60s

// Main tracking middleware
app.use((req, res, next) => {

    logging.consoleWarning(`${req.hostname} access!`)
    const ip =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    const hostname = req.hostname;
    let received = 0;
    let sent = 0;

    req.on('data', chunk => {
        received += chunk.length;
    });

    const originalWrite = res.write;
    const originalEnd = res.end;

    res.write = function (chunk, ...args) {
        if (chunk) sent += Buffer.byteLength(chunk);
        return originalWrite.call(this, chunk, ...args);
    };

    res.end = function (chunk, ...args) {
        if (chunk) sent += Buffer.byteLength(chunk);

        // Buffer the bandwidth per IP
        const key = `${ip}|${hostname}`;
        const entry = bandwidthMap.get(key) || { sent: 0, received: 0 };
        entry.sent += sent;
        entry.received += received;
        bandwidthMap.set(key, entry);

        return originalEnd.call(this, chunk, ...args);
    };

    next();
});




// -----------------------------------------------------   Logging Bandwidth Usage


// -----------------------------------------------------   Limit Bandwidth Usage

//const ipBandwidthLimits = {
//    '192.168.1.100': 50 * 1024, // 50 KB/sec
//    '203.0.113.12': 10 * 1024   // 10 KB/sec
//};

//app.use((req, res, next) => {
//    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//    const limit = ipBandwidthLimits[ip] || 100 * 1024; // default 100 KB/s

//    const throttle = new Throttle({ rate: limit });
//    const write = res.write.bind(res);

//    res.write = (chunk, ...args) => {
//        return throttle.write(chunk, () => {
//            write(chunk, ...args);
//        });
//    };

//    next();
//});


// -----------------------------------------------------   Limit Bandwidth Usage




//Forward all the http to https
//app.use((req, res, next) => {
//    if (req.headers['x-forwarded-proto'] !== 'https') {
//        return res.redirect('https://' + req.headers.host + req.url);
//    }
//    next();
//});



app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data
app.use(cookieParser()) // for parsing cookies (needed for JWT authentication)



// Assign subdomains to handlers
app.use(vhost('academy.vanvatcorp.com', academyApp));
app.use(vhost('account.vanvatcorp.com', accountApp));
app.use(vhost('ai.vanvatcorp.com', aiApp));
app.use(vhost('api.vanvatcorp.com', apiApp));
app.use(vhost('app.vanvatcorp.com', appApp));
app.use(vhost('archive.vanvatcorp.com', archiveApp));
app.use(vhost('auto.vanvatcorp.com', autoApp));
app.use(vhost('books.vanvatcorp.com', booksApp));
app.use(vhost('crypto.vanvatcorp.com', cryptoApp));
app.use(vhost('donate.vanvatcorp.com', donateApp));
app.use(vhost('drive.vanvatcorp.com', driveApp));
app.use(vhost('healthcare.vanvatcorp.com', healthcareApp));
app.use(vhost('media.vanvatcorp.com', mediaApp));
app.use(vhost('misc.vanvatcorp.com', miscApp));
app.use(vhost('services.vanvatcorp.com', servicesApp));
app.use(vhost('social.vanvatcorp.com', socialApp));
app.use(vhost('soprise.vanvatcorp.com', sopriseApp));
app.use(vhost('travel.vanvatcorp.com', travelApp));
app.use(vhost('www.vanvatcorp.com', wwwApp));
app.use(vhost('sftp.vanvatcorp.com', redirectApp));
app.use(vhost('smtp.vanvatcorp.com', redirectApp));
app.use(vhost('db.vanvatcorp.com', redirectApp));
app.use(vhost('contact.vanvatcorp.com', redirectApp));






const serveIndexOptions = { hidden: true, icons: true, stylesheet: path.join(__dirname, 'public/van-vat-corporation/res/serveIndex/GlobalDriveServe/style.css'), template: path.join(__dirname, 'public/van-vat-corporation/res/serveIndex/GlobalDriveServe/directory.html') };


app.use(busboy({
    highWaterMark: 256 * 1024 * 1024, // Set 256MiB buffer
})); // Insert the busboy middle-ware



// Routes
app.use('/auth', authRoutes);





//       -----     Server Protection     -----



const limiter = slowDown({
    windowMs: 4 * 60 * 1000, // 3 minutes
    delayAfter: 120, // Allow 100 requests per 15 minutes.
    delayMs: (hits) => hits * hits * 100, // Add 5000 ms of delay to every request after the 100th one.

    /**
     * So:
     *
     * - requests 1-5 are not delayed.
     * - request 6 is delayed by 600ms
     * - request 7 is delayed by 700ms
     * - request 8 is delayed by 800ms
     *
     * and so on. After 15 minutes, the delay is reset to 0.
     */
})

// Apply the delay middleware to all requests.
app.use(limiter)


//const apiLimiter = slowDown({
//    windowMs: 15 * 60 * 1000, // 15 minutes
//    delayAfter: 50, // Allow only one request to go at full-speed.
//    delayMs: (hits) => hits * hits * 1000, // 2nd request has a 4 second delay, 3rd is 9 seconds, 4th is 16, etc.
//})

//// Apply the delay middleware to API calls only.
//app.use('/api', apiLimiter)





//       -----     End Server Protection     -----












//app.use((req, res, next) => {
//    req.pipe(new Throttle({ rate: 102400 }));
//    next();
//});


//app.use((req, res) => {
//    req.pipe(new Throttle({ rate: 102400 }));
//});





//       -----     Task Manager     -----


app.get('/stats', async (req, res) => {
    const cpu = await si.currentLoad();
    const gpu = await si.graphics();
    const mem = await si.mem();
    const network = await si.networkStats();

    res.json({
        cpuUsage: cpu.currentLoad,
        gpuUsage: gpu.controllers[0].utilizationGpu,
        usedRAM: mem.active / (1024 * 1024), // Convert to MB
        maxRAM: mem.total / (1024 * 1024), // Convert to MB
        networkSend: network[0].tx_sec / (1024 * 1024), // Convert to MB/s
        networkReceive: network[0].rx_sec / (1024 * 1024) // Convert to MB/s
    });
});


//       -----     End Task Manager     -----




//       -----     Donator     -----


app.get('/donate/info', (req, res) => {
    fs.readFile('public/donateInfo.txt', 'utf8', (err, data) => {
        if (err) {
            logging.consoleError(err);
            return;
        }
        res.json(data.split("\n"));
    });
});


//       -----     End Donator     -----










//       -----     UploaderPrivate     -----






app.use(session({
    secret: 'jlsdfjlkjglsjgfbndfngrigjh',
    resave: false,
    saveUninitialized: true,
    //cookie: {
    //    secure: true,
    //    maxAge: 1000,
    //}
}));


var planUploaderPrivate;
var userData;
var userDataConfig;

fs.readFile('data/plans.txt', 'utf8', (err, data) => {
    if (err) {
        logging.consoleError(err);
        return;
    }
    planUploaderPrivate = JSON.parse(data); //now it an object
});
fs.readFile('data/uploaderPrivate.txt', 'utf8', (err, data) => {
    if (err) {
        logging.consoleError(err);
        return;
    }
    try {
        userData = JSON.parse(data); //now it an object
    }
    catch (e) {
        userData = {
            groups: []
        };
    }
});
fs.readFile('data/uploaderPrivateConfig.txt', 'utf8', (err, data) => {
    if (err) {
        logging.consoleError(err);
        return;
    }
    try {
        userDataConfig = JSON.parse(data); //now it an object
    }
    catch (e) {
        userDataConfig = {
            groups: []
        };
    }
});




app.post('/register-admin', (req, res) => {

    const { secret, group, admin, password, plan } = req.body;

    if (secret != "HoangThiMyDuyen@123") {
        res.redirect('/UploaderPrivate/loginForm');
        return;
    }

    fs.readFile('data/uploaderPrivate.txt', 'utf8', (err, data) => {
        if (err) {
            logging.consoleError(err);
            return;
        }
        try {
            userData = JSON.parse(data); //now it an object
        }
        catch (e) {
            userData = {
                groups: []
            };
        }

        var groupExist = false;
        for (i = 0; i < userData.groups.length; i++) {

            if (userData.groups[i].name === group) {
                groupExist = true;

                var usernames = [admin];
                var passwords = [password];
                userData.groups[i] = {
                    name: group,
                    owner: admin,
                    usernames: usernames,
                    passwords: passwords,
                    plan: plan
                };
                break;
            }
        }
        if (!groupExist) {

            var usernames = [admin];
            var passwords = [password];
            userData.groups.push({
                name: group,
                owner: admin,
                usernames: usernames,
                passwords: passwords,
                plan: plan
            }); //add some data


            var publicPaths = [];
            userDataConfig.groups.push({
                name: group,
                publicPaths: publicPaths
            }); //add some data

            res.json({ returnCode: 1 });
        }
        else
            res.json({ returnCode: -1 });

        json = JSON.stringify(userData); //convert it back to json
        fs.writeFile('data/uploaderPrivate.txt', json, 'utf8', (err) => {
            if (err)
                logging.consoleLog('Error written to file!');
            logging.consoleLog('Data written to file');
        }); // write it back 
    });
});



app.post('/login-uploader-private', (req, res) => {

    const { group, username, password } = req.body;

    for (w = 0; w < userData.groups.length; w++) {
        const str = userData.groups[w];
        if (str.name != group) continue;
        for (i = 0; i < planUploaderPrivate[str.plan].slot; i++) {
            if (str.usernames[i] === "" || username === "" || str.passwords[i] === "" || password === "") continue;
            if (str.usernames[i] === "undefined" || username === "undefined" || str.passwords[i] === "undefined" || password === "undefined") continue;
            if (str.usernames[i] === username && str.passwords[i] === password) {
                //res.json({ returnCode: 1 });
                req.session.user = group;
                req.session.groupID = w;
                req.session.loginUsername = username;

                for (wa = 0; wa < userDataConfig.groups.length; wa++) {
                    if (userDataConfig.groups[wa].name === group) {
                        req.session.groupConfigID = wa;
                    }
                }
                res.redirect(`/UploaderPrivate/Storages/${group}`);
                return;
            }
        }
    }
    res.redirect('/UploaderPrivate/loginForm');
});

app.get('/UploaderPrivate', (req, res) => {
    res.redirect('/UploaderPrivate/loginForm');
});
app.get('/UploaderPrivate/Storages/:group', (req, res) => {
    if (req.session.user === req.params.group) {
        res.sendFile(__dirname + '/public/UploaderPrivate/main/');
        //res.send(`Welcome, ${req.params.group}!`);
    } else {
        res.redirect('/UploaderPrivate/loginForm');
    }
});
app.use('/UploaderPrivate/main', express.static(path.join(__dirname, 'public/UploaderPrivate/main')));

//app.get('/UploaderPrivate/main/script.js', (req, res) => {
//    res.sendFile(__dirname + '/public/UploaderPrivate/main/script.js');
//});
//app.get('/UploaderPrivate/main/styles.css', (req, res) => {
//    res.sendFile(__dirname + '/public/UploaderPrivate/main/styles.css');
//});


app.get('/UploaderPrivate/loginForm/login.js', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
app.get('/UploaderPrivate/loginForm/styles.css', (req, res) => {
    res.sendFile(__dirname + '/styles.css');
});






























//// Set up storage engine
//const storagePrivate = multer.diskStorage({
//    destination: './private/UploaderPrivate/uploadsTemp/:group',
//    filename: (req, file, cb) => {
//        cb(null, file.originalname);
//    }
//});


//// Initialize upload
//const uploadPrivate = multer({ storage: storagePrivate });
//// Initialize upload
//const uploadFolderPrivate = multer({ storage: storagePrivate });









function uploadBusboyPrivate(req, res, next) {

    if (req.session.user) {
        logging.consoleLog('User requesting Busboy Uploader Method...');






        var userGroup = userData.groups[req.session.groupID];



        var userUsedSpace;

        var userFolder = `./private/UploaderPrivate/${req.session.user}/uploads`;

        fs.mkdirSync(userFolder, { recursive: true });
        function getFolderSize(folderPath, callback) {
            let totalSize = 0;

            function calculateSize(filePath) {
                const stats = fs.statSync(filePath);
                if (stats.isDirectory()) {
                    const files = fs.readdirSync(filePath);
                    files.forEach(file => calculateSize(path.join(filePath, file)));
                } else {
                    totalSize += stats.size;
                }
            }

            try {
                calculateSize(folderPath);
                callback(null, totalSize);
            } catch (error) {
                callback(error);
            }
        }

        // Usage example
        getFolderSize(userFolder, (error, size) => {
            if (error) {
                logging.consoleError('Error calculating folder size:', error);
            } else {
                userUsedSpace = size;
            }
        });
















        req.pipe(req.busboy); // Pipe it through busboy

        let targetFolderC = '';
        let folderName = '';
        let numberOfFiles = 0;
        let totalFile = 0;
        let tempFiles = [];

        //TODO: make field always loaded first
        req.busboy.on('field', (fieldname, val) => {
            if (fieldname === 'targetFolder') {
                targetFolderC = val;
            }
            if (fieldname === 'folderName') {
                folderName = val;
            }
        });

        req.busboy.on('file', (fieldname, file, filename) => {
            logging.consoleLog(`Upload of '${filename.filename}' started`);
            numberOfFiles++;
            totalFile++;
            var tempPath = `./private/UploaderPrivate/${req.session.user}/uploadsTemp/`;
            var tempFilePath = path.join(tempPath, filename.filename);
            fs.mkdirSync(tempPath, { recursive: true });

            tempFiles.push(tempFilePath);
            // Create a write stream of the new file
            const fstream = fs.createWriteStream(tempFilePath);
            // Pipe it trough
            file.pipe(fstream);
            let fileSize = 0;
            let maxFileSize = planUploaderPrivate[userGroup.plan].diskSize - userUsedSpace;

            file.on('data', (data) => {
                fileSize += data.length;
                if (fileSize > maxFileSize) {
                    logging.consoleLog(`Exceed limit! Aborting...`);
                    // File size exceeds limit, reject the upload
                    try {
                        //TODO: get user space left in the API below, subtract to the total and figure a way to stop it mid-stream
                        file.resume(); // Discard remaining data
                        fstream.end(); // Close the write stream
                        file.unpipe(fstream);
                        req.unpipe(busboy);
                        return;
                    }
                    catch (e) {
                    }
                }
            });


            // On finish of the upload
            fstream.on('close', () => {
                logging.consoleLog(`'${targetFolderC}'`);
                logging.consoleLog(`Upload of '${filename.filename}' finished`);
                numberOfFiles--;
                if (numberOfFiles <= 0) {
                    tempFiles.forEach((temp) => {
                        const targetFolder = path.join(`./private/UploaderPrivate/${req.session.user}/uploads/`, targetFolderC, folderName);

                        const oldPath = temp;
                        const newPath = path.join(targetFolder, temp.substring(temp.lastIndexOf("uploadsTemp") + 12));
                        fs.mkdirSync(targetFolder, { recursive: true });
                        fs.renameSync(oldPath, newPath);
                    });

                    logging.consoleLog(`Received total of ${totalFile} files`);
                    if (fileSize > maxFileSize) {
                        //res.status(400).send('File size exceeds the limit.');

                        res.set("Connection", "close");
                        res.sendStatus(413);
                    }
                    else
                        res.redirect('back');
                }

            });
        });






    } else {
        res.status(401).send('Unauthorized');
    }




}


























app.route('/upload-private').post((req, res, next) => uploadBusboyPrivate(req, res, next));
app.route('/upload-folder-private').post((req, res, next) => uploadBusboyPrivate(req, res, next));
app.route('/upload-drag-private').post((req, res, next) => uploadBusboyPrivate(req, res, next));





//// Handle file upload
//app.post('/upload-old', uploadPrivate.array('files[]'), (req, res) => {
//    logging.consoleLog('User requesting Multer Uploader Method...');
//    const targetFolder = path.join("./private/UploaderPrivate/:group/" + req.body.targetFolder);
//    if (req.file) {


//        const oldPath = req.file.path;
//        const newPath = path.join(targetFolder, req.file.originalname);
//        fs.mkdirSync(targetFolder, { recursive: true });
//        fs.renameSync(oldPath, newPath);


//        logging.consoleLog('File received:', req.file);
//        res.send('File uploaded successfully!');
//    } else if (req.files) {

//        req.files.forEach(file => {
//            const oldPath = file.path;
//            const newPath = path.join(targetFolder, file.originalname);
//            fs.mkdirSync(targetFolder, { recursive: true });
//            fs.renameSync(oldPath, newPath);
//        });


//        logging.consoleLog('Files received:', req.files);
//        res.json({ message: 'Files received' });
//        //res.send('All files uploaded successfully!');
//    } else {
//        res.json({ message: 'Files not received' });
//        //res.send('No file uploaded.');
//    }
//});

//// Handle folder upload
//app.post('/upload-folder-old', uploadFolderPrivate.array('files[]'), (req, res) => {
//    logging.consoleLog('User requesting Multer Uploader Method...');
//    if (req.files.length > 0) {
//        const targetFolder = req.body.targetFolder;
//        const folderName = req.body.folderName;
//        const folderPath = path.join('./private/UploaderPrivate/:group/', targetFolder, folderName);

//        if (!fs.existsSync(folderPath)) {
//            fs.mkdirSync(folderPath);
//        }

//        req.files.forEach(file => {
//            const oldPath = file.path;
//            const newPath = path.join(folderPath, file.originalname);
//            fs.mkdirSync(folderPath, { recursive: true });
//            fs.renameSync(oldPath, newPath);
//        });

//        res.json({ message: 'Folder received', folderName: folderName });
//        //res.send(`Files uploaded successfully to folder: ${folderName}`);
//    } else {
//        res.json({ message: 'Folder not received' });
//        //res.send('No files uploaded.');
//    }
//});

//app.post('/upload-drag-old', uploadFolderPrivate.array('files[]'), (req, res) => {
//    logging.consoleLog('User requesting Multer Uploader Method...');
//    const targetFolder = path.join("./private/UploaderPrivate/:group/" + req.body.targetFolder);
//    const folderName = req.body.folderName;


//    req.files.forEach(file => {
//        const oldPath = file.path;
//        const newPath = path.join(targetFolder, file.originalname);
//        fs.mkdirSync(targetFolder, { recursive: true });
//        fs.renameSync(oldPath, newPath);
//    });

//    logging.consoleLog("Received folder name: " + folderName);
//    logging.consoleLog("Received files: ", req.files);
//    res.json({ message: 'Folder name and files received', folderName: folderName });
//});










































// API to get list of files
app.get('/api/private/files/:group', (req, res) => {

    if (req.session.user === req.params.group) {
        var paths = userDataConfig.groups[req.session.groupConfigID].publicPaths;



        var userFolder = `./private/UploaderPrivate/${req.session.user}/uploads`;
        fs.mkdirSync(userFolder, { recursive: true });
        fs.readdir(userFolder, (err, files) => {
            if (err) {
                return res.status(500).send('Unable to scan directory');
            }
            res.json({ files: files, public: paths });
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

// API to get list of files
app.get('/api/private/accountInfo/disk/:group', async (req, res) => {


    var userFolder = `./private/UploaderPrivate/${req.params.group}/uploads`;




    if (req.session.user) {
        fs.mkdirSync(userFolder, { recursive: true });
        function getFolderSize(folderPath, callback) {
            let totalSize = 0;

            function calculateSize(filePath) {
                const stats = fs.statSync(filePath);
                if (stats.isDirectory()) {
                    const files = fs.readdirSync(filePath);
                    files.forEach(file => calculateSize(path.join(filePath, file)));
                } else {
                    totalSize += stats.size;
                }
            }

            try {
                calculateSize(folderPath);
                callback(null, totalSize);
            } catch (error) {
                callback(error);
            }
        }

        // Usage example
        getFolderSize(userFolder, (error, size) => {
            if (error) {
                logging.consoleError('Error calculating folder size:', error);
            } else {
                for (var str of userData.groups) {

                    if (str.name != req.session.user) continue;

                    res.json({
                        spaceTotal: planUploaderPrivate[str.plan].diskSize,//(536870912),
                        spaceUsed: (size)
                    });
                }
            }
        });



    } else {
        res.status(401).send('Unauthorized');
    }





});

// API to get list of files
app.get('/api/private/accountInfo/plans', (req, res) => {
    res.json(planUploaderPrivate);
});

// API to get list of files
app.get('/api/private/accountInfo/logon/:group', (req, res) => {

    if (req.session.user) {
        res.json({
            currentGroup: userData.groups[req.session.groupID],
            plan: planUploaderPrivate[userData.groups[req.session.groupID].plan],
            loginSession: req.session.loginUsername
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});







app.post("/UploaderPrivate/Storages/:group/actions", (req, res) => {
    if (req.session && req.session.user) {
        if (req.session.user === req.params.group) {
            const { action, params1 } = req.body;
            switch (action) {
                case "delete":
                    try {
                        var pathFile = path.join(__dirname, 'private/UploaderPrivate', req.session.user, "uploads", params1);

                        const stats = fs.statSync(pathFile);

                        if (stats.isFile()) {
                            fs.unlinkSync(pathFile);
                            logging.consoleLog('File ' + pathFile + ' deleted successfully.');
                        } else if (stats.isDirectory()) {
                            fs.rmSync(pathFile, { recursive: true, force: true });
                            logging.consoleLog('Folder ' + pathFile + ' deleted successfully.');
                        }



                        res.json({ returnCode: 1 });
                        return;
                    } catch (err) {
                        logging.consoleError('An error occurred:', err.message);
                    }


                    break;
                case "publish":
                    try {
                        var urlReq = `uploads/${params1}`;
                        var group = req.session.user;




                        var exists = false;
                        var publicPaths = userDataConfig.groups[req.session.groupConfigID].publicPaths;
                        for (const _ of publicPaths) {
                            if (_ === urlReq) {
                                exists = true;
                                const indexToRemove = publicPaths.indexOf(urlReq); // Find the index of "Apple"
                                if (indexToRemove !== -1) {
                                    publicPaths.splice(indexToRemove, 1); // Remove 1 element at the found index
                                }
                                break;
                            }
                        }
                        if (!exists)
                            publicPaths.push(urlReq);
                        userDataConfig.groups[i] = {
                            name: group,
                            publicPaths: publicPaths
                        };


                        res.json({ returnCode: 1 });

                        json = JSON.stringify(userDataConfig); //convert it back to json
                        fs.writeFile('data/uploaderPrivateConfig.txt', json, 'utf8', (err) => {
                            if (err)
                                logging.consoleLog('Error written to file!');
                            logging.consoleLog('Data written to file');
                        }); // write it back 






                        return;
                    } catch (err) {
                        logging.consoleError('An error occurred:', err.message);
                    }
                    break;
                case "updateSettings":
                    if (userData.groups[req.session.groupID].owner === req.session.loginUsername) {

                        var isDiff = false;
                        if (userData.groups[req.session.groupID].usernames.length != params1.usernames.length) isDiff = true;
                        if (userData.groups[req.session.groupID].passwords.length != params1.passwords.length) isDiff = true;

                        if (!isDiff) {
                            for (i = 0; i < userData.groups[req.session.groupID].usernames.length; i++) {
                                if (userData.groups[req.session.groupID].usernames[i] != params1.usernames[i]) {
                                    isDiff = true;
                                    break;
                                }
                            }
                        }
                        if (!isDiff) {
                            for (i = 0; i < userData.groups[req.session.groupID].passwords.length; i++) {
                                if (userData.groups[req.session.groupID].passwords[i] != params1.passwords[i]) {
                                    isDiff = true;
                                    break;
                                }
                            }
                        }




                        if (isDiff) {
                            if (params1.usernames && params1.passwords) {

                                userData.groups[req.session.groupID].usernames = params1.usernames;
                                userData.groups[req.session.groupID].passwords = params1.passwords;
                                res.json({ returnCode: 1 });

                                json = JSON.stringify(userData); //convert it back to json
                                fs.writeFile('data/uploaderPrivate.txt', json, 'utf8', (err) => {
                                    if (err)
                                        logging.consoleLog('Error written to file!');
                                    logging.consoleLog('Data written to file');
                                }); // write it back 
                            }

                        }

                    }
                    else {
                        logging.consoleLog(`Prevent user: ${req.session.loginUsername} (not admin) from modifying the setttings`);







                        var isDiff = false;
                        var indexChange;

                        for (i = 0; i < userData.groups[req.session.groupID].usernames.length; i++) {

                            if (userData.groups[req.session.groupID].usernames[i] === req.session.loginUsername) {
                                if (userData.groups[req.session.groupID].usernames[i] != params1.username) {
                                    isDiff = true;
                                }

                                for (k = 0; k < userData.groups[req.session.groupID].passwords.length; k++) {
                                    if (userData.groups[req.session.groupID].passwords[k] != params1.password) {
                                        isDiff = true;
                                        break;
                                    }
                                }
                                indexChange = i;
                                break;
                            }
                        }

                        if (isDiff) {
                            userData.groups[req.session.groupID].usernames[indexChange] = params1.username;
                            userData.groups[req.session.groupID].passwords[indexChange] = params1.password;
                            res.redirect('/UploaderPrivate/loginForm');

                            json = JSON.stringify(userData); //convert it back to json
                            fs.writeFile('data/uploaderPrivate.txt', json, 'utf8', (err) => {
                                if (err)
                                    logging.consoleLog('Error written to file!');
                                logging.consoleLog('Data written to file');
                            }); // write it back 

                        }
                    }
                    break;
            }
        } else {
            res.status(401).send('Unauthorized');
        }
    }
    else {
        res.status(403).send('Access denied.');
    }
});


// use serve index to nav public folder
app.use('/UploaderPrivate/Storages/:group', (req, res, next) => {
    var isFoundGroup = false;
    var isPublicUrl = false;
    var s = req.baseUrl.split("/");
    var groupAccessing = s.at(s.length - 1);

    for (var i of userDataConfig.groups) {
        if (i.name === groupAccessing) {
            isFoundGroup = true;
            for (var ii of i.publicPaths) {
                //logging.consoleLog(`${req.url}  ${ii}    ${req.url.includes(ii) }`);
                if (req.url.includes(ii)) {
                    isPublicUrl = true;
                    break;
                }
            }
        }
        if (isFoundGroup) break;
    }


    if (req.session && req.session.user) {

        if (req.session.user === req.params.group || isPublicUrl) {
            next();
        } else {
            logging.consoleLog(`IP: ${req.ips} has not allowed for accessing this site!`);
            res.status(401).send('Unauthorized');
        }

        //res.sendFile(path.join(__dirname, 'private/UploaderPrivate'));
    } else if (isPublicUrl) {
        next();
    } else {
        res.status(403).send('Access denied.');
    }
});
app.use('/UploaderPrivate/Storages', express.static(path.join(__dirname, 'private/UploaderPrivate')));
app.use('/UploaderPrivate/register', express.static(path.join(__dirname, 'Uploader/uploads')));

app.use('/UploaderPrivate/Storages', serveIndex(path.join(__dirname, 'private/UploaderPrivate'), serveIndexOptions));


//       -----     End UploaderPrivate     -----













//       -----     Vilitext     -----

//            !!! Deprecated !!!

//let contentDeliveryMessaging = [];


//app.get('/api/social.message/fetch/:UUID', (req, res) => {
//    if (req.session && req.session.social && req.session.social.uuid && req.session.social.uuid === req.params.UUID) {
//        for (const cdn of contentDeliveryMessaging) {
//            if (cdn.target === req.params.UUID) {
//                res.json(cdn);
//            }
//        }
//    }
//    else
//        res.status(401).send('Unauthorized');
//});

//app.post('/api/social.message/send/:targetUUID/:senderUUID', (req, res) => {
//    if (req.session && req.session.social && req.session.social.uuid && req.session.social.uuid === req.params.senderUUID) {
//        const { text } = req.body;
//        contentDeliveryMessaging.push({ target: req.params.targetUUID, sender: req.params.senderUUID, content: text });
//    }
//    else
//        res.status(401).send('Unauthorized');
//});





//       -----     End Vilitext     -----





//       -----     THPTTanTuc/Scheduler     -----


// API to get list of files
app.get('/api/THPTTanTuc/Scheduler/submit', (req, res) => {
    res.json({
        text: onlineTextContent
    });
});



app.post('/api/THPTTanTuc/Scheduler/get', (req, res) => {

    const { text } = req.body;
    onlineTextContent = text;
});


//       -----     End THPTTanTuc/Scheduler     -----







//       -----     Countdowns/UpcomingEvent     -----

let countdowns_UpcomingEvent = [];


fs.readFile('data/countdowns_UpcomingEvent.txt', 'utf8', (err, data) => {
    if (err) {
        logging.consoleError(err);
        return;
    }
    try {
        countdowns_UpcomingEvent = JSON.parse(data); //now it an object
    }
    catch (e) {
        countdowns_UpcomingEvent = [{
            id: "none",
            event: "Chưa có sự kiện",
            time: 142423
        }];
    }
});

// API to get list of files
app.get('/api/Countdowns/UpcomingEvent/SelectedEvent/:eventID', (req, res) => {
    for (const a of countdowns_UpcomingEvent) {
        if (req.params.eventID === a.id) {
            res.json({
                eventWrapped: a
            });
            return;
        }
    }
    res.json({
        eventWrapped: {
            id: "null",
            event: "Sự kiện sai",
            time: 142423
        }
    });
});



app.get('/api/Countdowns/UpcomingEvent/AllEvent', (req, res) => {

    res.json({
        eventsWrapped: countdowns_UpcomingEvent
    });
});


//       -----     End Countdowns/UpcomingEvent     -----






//       ==================================     VanVatCorporation     ==================================




//       ====================     VanVatStudy     ====================






//       ====================     End VanVatStudy     ====================

























//       ==================================     End VanVatCorporation     ==================================


























//app.use(express.static(__dirname + '/public'));

// Serve the uploaded files statically
//app.use('/van-vat-corporation', express.static(path.join(__dirname, 'data/van-vat-corporation')));


















//       ====================     Firebase     ====================

const socialUUIDToFirebaseToken = new Map();

// API to get list of files
app.post('/api/social.message/merge', (req, res) => {
    if (req.session && req.session.social && req.session.social.username) {
        const { token } = req.body;
        socialUUIDToFirebaseToken.set(req.session.social.username, token);

        logging.consoleLog(`Merging for ${req.session.social.username}`)
        res.json({ returnCode: 200 });
    }
    else {

        logging.consoleLog(`Failed`)
        res.json({ returnCode: 400 });
    }
});


app.post('/api/social.message/send', (req, res) => {

    const { text, target, sender } = req.body;
    const message = {
        notification: {
            title: sender,
            body: text
        },
        token: socialUUIDToFirebaseToken.get(target)
    };

    logging.consoleLog(`Sending message to ${socialUUIDToFirebaseToken.get(target)}`)

    // Send a message to the device corresponding to the provided
    // registration token.
    firebase.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            logging.consoleLog('Successfully sent message:', response);
            res.json({ returnCode: 200 });
        })
        .catch((error) => {
            logging.consoleLog('Error sending message:', error);
            res.json({ returnCode: 400 });
        });
});

//       ====================     End Firebase     ====================
























// =================================================       TEMPORARY SOCIAL (Already have social app)



//       -----     SocialNetwork     -----

const uuidGenNamespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'; // Example namespace

app.get('/SocialNetwork', (req, res) => {
    res.redirect('/SocialNetwork/login');
});


var userDataSocialNetwork;

fs.readFile('data/userDataSocialNetwork.txt', 'utf8', (err, data) => {
    if (err) {
        logging.consoleError(err);
        return;
    }
    try {
        userDataSocialNetwork = JSON.parse(data); //now it an object
    }
    catch (e) {
        userDataSocialNetwork = {
            users: []
        };
    }
});

var socialNetworkPosts;

fs.readFile('data/socialNetworkPosts.txt', 'utf8', (err, data) => {
    if (err) {
        logging.consoleError(err);
        return;
    }
    try {
        socialNetworkPosts = JSON.parse(data); //now it an object
    }
    catch (e) {
        socialNetworkPosts = {
            posts: []
        };
    }
});





app.post('/register-social', (req, res) => {

    const { username, password, gender } = req.body;

    for (i = 0; i < userDataSocialNetwork.users.length; i++) {
        if (userDataSocialNetwork.users[i].username === username) {
            res.json({ returnCode: 400 });
            return;
        }
    }
    const forbiddenLetter = [' ', '!', '#', '$', '%', '^', '&', '*', '(', ')', '=', '+', '{', '}', '[', ']', '\\', '|', '"', '\'', ':', ';', '/', '?', '>', '<', ',', '~', '`']
    for (const r of forbiddenLetter) {
        if (username.includes(r)) {
            res.json({ returnCode: 400 });
            return;
        }
    }

    var userInfo = {
        displayName: username,
        bio: "",
        gender: gender,
        postCount: 0,
        approvedAccount: false
    };
    userDataSocialNetwork.users.push({ username, password, userInfo });




    const uuid = uuidGen.v5(username, uuidGenNamespace);

    req.session.social = { userInfo: userInfo, username: username, uuid: uuid };




    //// File destination.txt will be created or overwritten by default.
    //fs.copyFile('source.txt', 'destination.txt', (err) => {
    //    if (err)
    //        logging.consoleLog('Error written to file!');
    //    logging.consoleLog('Data written to file');
    //});

    const src = path.join(__dirname, `public/SocialNetwork/user_resources/default_${(gender === 1 ? "fe" : "")}male`);
    const dest = path.join(__dirname, `public/SocialNetwork/me/${uuid}`);

    fs.cpSync(src, dest, { recursive: true });



    res.json({ returnCode: 200, link: `/SocialNetwork/main` });


    json = JSON.stringify(userDataSocialNetwork); //convert it back to json
    fs.writeFile('data/userDataSocialNetwork.txt', json, 'utf8', (err) => {
        if (err)
            logging.consoleLog('Error written to file!');
        logging.consoleLog('Data written to file');
    }); // write it back 
});



app.post('/login-social', (req, res) => {

    const { username, password } = req.body;
    var matchUsername = false;

    for (w = 0; w < userDataSocialNetwork.users.length; w++) {
        const str = userDataSocialNetwork.users[w];
        if (str.username === "" || username === "" || str.password === "" || password === "") continue;
        if (str.username === "undefined" || username === "undefined" || str.password === "undefined" || password === "undefined") continue;
        if (str.username === username && str.password === password) {
            //res.json({ returnCode: 1 });
            logging.consoleLog(uuidGenNamespace);
            const uuid = uuidGen.v5(username, uuidGenNamespace);



            req.session.social = { userInfo: str.userInfo, username: str.username, uuid: uuid };



            res.json({ returnCode: 200, link: `/SocialNetwork/main` });
            return;
        }
        if (!matchUsername) {
            matchUsername = str.username === username;
        }
    }
    if (matchUsername) {
        res.json({ returnCode: 401 });
    }
    else
        res.json({ returnCode: 400 });
});

app.post('/reinfo-social', (req, res) => {

    const { displayName, bio } = req.body;

    if (req.session && req.session.social && req.session.social.uuid) {

        for (w = 0; w < userDataSocialNetwork.users.length; w++) {
            const str = userDataSocialNetwork.users[w];
            if (str.username === "") continue;
            if (str.username === "undefined") continue;
            const uuid = uuidGen.v5(str.username, uuidGenNamespace);
            if (uuid === req.session.social.uuid) {

                if (displayName != "null")
                    str.userInfo.displayName = displayName;
                if (bio != "null")
                    str.userInfo.bio = bio;

                req.session.social.userInfo = str.userInfo;



                json = JSON.stringify(userDataSocialNetwork); //convert it back to json
                fs.writeFile('data/userDataSocialNetwork.txt', json, 'utf8', (err) => {
                    if (err)
                        logging.consoleLog('Error written to file!');
                    logging.consoleLog('Data written to file');
                }); // write it back 


                res.json({ returnCode: 200 });
                return;
            }
        }
    }
    res.json({ returnCode: 400 });
});



app.route('/reavatar-social/:uuid').post((req, res, next) => {

    if (req.session && req.session.social && req.session.social.uuid) {

        for (w = 0; w < userDataSocialNetwork.users.length; w++) {
            const str = userDataSocialNetwork.users[w];
            if (str.username === "") continue;
            if (str.username === "undefined") continue;
            const uuid = uuidGen.v5(str.username, uuidGenNamespace);
            if (uuid === req.session.social.uuid) {

                req.pipe(req.busboy); // Pipe it through busboy

                req.busboy.on('file', (fieldname, file, filename) => {
                    var avtFilePath = `./public/SocialNetwork/me/${uuid}/profile/avt.png`;

                    // Create a write stream of the new file
                    const fstream = fs.createWriteStream(avtFilePath);
                    // Pipe it trough
                    file.pipe(fstream);
                    let fileSize = 0;
                    let maxFileSize = 26214400;

                    file.on('data', (data) => {
                        fileSize += data.length;
                        if (fileSize > maxFileSize) {
                            logging.consoleLog(`Exceed limit! Aborting...`);
                            // File size exceeds limit, reject the upload
                            try {
                                //TODO: get user space left in the API below, subtract to the total and figure a way to stop it mid-stream
                                file.resume(); // Discard remaining data
                                fstream.end(); // Close the write stream
                                file.unpipe(fstream);
                                req.unpipe(busboy);
                                return;
                            }
                            catch (e) {
                            }
                        }
                    });


                    // On finish of the upload
                    fstream.on('close', () => {
                        if (fileSize > maxFileSize) {
                            res.set("Connection", "close");
                            res.sendStatus(413);
                        }
                        else
                            res.redirect('back');
                    });
                });

            }
        }
    }
});


app.route('/posting-social/:uuid').post((req, res, next) => {
    if (req.session && req.session.social && req.session.social.uuid) {
        for (w = 0; w < userDataSocialNetwork.users.length; w++) {
            const str = userDataSocialNetwork.users[w];
            if (str.username === "") continue;
            if (str.username === "undefined") continue;
            const uuid = uuidGen.v5(str.username, uuidGenNamespace);
            if (uuid === req.session.social.uuid) {

                var numberOfFiles = 0;
                var totalFiles = 0;
                var tempFiles = [];
                var onlyText = true;

                var avtFilePath;

                req.pipe(req.busboy); // Pipe it through busboy

                var postText;

                req.busboy.on('field', (fieldname, val) => {
                    //if (fieldname === 'isTextOnly') {
                    //    onlyText = val;
                    //}


                    if (fieldname === 'postText' && val.length > 0) {
                        postText = val;
                        setTimeout(_ => {


                            if (onlyText) {


                                var attachmentsPaths = [];

                                res.redirect('back');
                                str.userInfo.postCount++;

                                const uploaderInfo = req.session.social.userInfo;
                                const timestamp = new Date().getTime();
                                const comments = []
                                const reactions =
                                {
                                    like: 0,
                                    love: 0,
                                    haha: 0,
                                    sad: 0,
                                    sad1: 0,
                                    angry: 0
                                }
                                socialNetworkPosts.posts.push({ uuid, uploaderInfo, postText, attachmentsPaths, timestamp, comments, reactions });


                                json = JSON.stringify(socialNetworkPosts); //convert it back to json
                                fs.writeFile('data/socialNetworkPosts.txt', json, 'utf8', (err) => {
                                    if (err)
                                        logging.consoleLog('Error written to file!');
                                    logging.consoleLog('Data written to file');
                                }); // write it back



                            }


                        }, 1000);
                    }


                });

                req.busboy.on('file', (fieldname, file, filename) => {
                    avtFolderPath = `./public/SocialNetwork/me/${uuid}/posts/`;
                    avtFilePath = `./public/SocialNetwork/me/${uuid}/posts/post_${str.userInfo.postCount}_id_.${filename.filename}`;
                    logging.consoleLog(filename.filename);

                    tempFiles.push(avtFilePath);
                    numberOfFiles++;
                    totalFiles++;
                    fs.mkdirSync(avtFolderPath, { recursive: true });

                    // Create a write stream of the new file
                    const fstream = fs.createWriteStream(avtFilePath);
                    // Pipe it trough
                    file.pipe(fstream);
                    let fileSize = 0;
                    let maxFileSize = 1073741824;  //1GB

                    file.on('data', (data) => {
                        fileSize += data.length;
                        if (fileSize > maxFileSize) {
                            logging.consoleLog(`Exceed limit! Aborting...`);
                            // File size exceeds limit, reject the upload
                            try {
                                //TODO: get user space left in the API below, subtract to the total and figure a way to stop it mid-stream
                                file.resume(); // Discard remaining data
                                fstream.end(); // Close the write stream
                                file.unpipe(fstream);
                                req.unpipe(busboy);
                                return;
                            }
                            catch (e) {
                            }
                        }
                    });


                    // On finish of the upload
                    fstream.on('close', () => {

                        numberOfFiles--;
                        if (numberOfFiles <= 0) {

                            logging.consoleLog(`Received total of ${totalFiles} files`);



                            if (fileSize > maxFileSize) {
                                res.set("Connection", "close");
                                res.sendStatus(413);
                            }

                            else {

                                var attachmentsPaths = [];
                                for (e = 0; e < totalFiles; e++) {
                                    const oldPath = tempFiles[e];
                                    const newPath = `./public/SocialNetwork/me/${uuid}/posts/post_${str.userInfo.postCount}_id_${e}.${tempFiles[e].substring(tempFiles[e].lastIndexOf("."))}`;
                                    fs.renameSync(oldPath, newPath);
                                    attachmentsPaths.push(`/SocialNetwork/me/${uuid}/posts/post_${str.userInfo.postCount}_id_${e}.${tempFiles[e].substring(tempFiles[e].lastIndexOf("."))}`)
                                }

                                res.redirect('back');
                                str.userInfo.postCount++;

                                const uploaderInfo = req.session.social.userInfo;
                                const timestamp = new Date().getTime();
                                const comments = []
                                const reactions =
                                {
                                    like: 0,
                                    love: 0,
                                    haha: 0,
                                    sad: 0,
                                    sad1: 0,
                                    angry: 0
                                }
                                socialNetworkPosts.posts.push({ uuid, uploaderInfo, postText, attachmentsPaths, timestamp, comments, reactions });


                                json = JSON.stringify(socialNetworkPosts); //convert it back to json
                                fs.writeFile('data/socialNetworkPosts.txt', json, 'utf8', (err) => {
                                    if (err)
                                        logging.consoleLog('Error written to file!');
                                    logging.consoleLog('Data written to file');
                                }); // write it back 
                            }
                        }
                    });
                });

            }
        }
    }
});





app.route('/commenting-social/:timestamp/:uuid').post((req, res, next) => {

    if (req.session && req.session.social && req.session.social.uuid) {
        for (w = 0; w < userDataSocialNetwork.users.length; w++) {
            const str = userDataSocialNetwork.users[w];
            if (str.username === "") continue;
            if (str.username === "undefined") continue;
            const uuid = uuidGen.v5(str.username, uuidGenNamespace);
            if (uuid === req.session.social.uuid) {


                for (wa = 0; wa < socialNetworkPosts.posts.length; wa++) {
                    const str1 = socialNetworkPosts.posts[wa];
                    if (str1.timestamp == req.params.timestamp) {
                        var post = str1;










                        var numberOfFiles = 0;
                        var totalFiles = 0;
                        var tempFiles = [];
                        var onlyText = true;

                        var avtFilePath;

                        req.pipe(req.busboy); // Pipe it through busboy

                        var postText;

                        req.busboy.on('field', (fieldname, val) => {
                            if (fieldname === 'postText' && val.length > 0) {
                                postText = val;

                                setTimeout(_ => {
                                    if (onlyText) {


                                        var attachmentsPaths = [];

                                        res.redirect('back');
                                        str.userInfo.commentCount++;

                                        const uploaderInfo = req.session.social.userInfo;
                                        const timestamp = new Date().getTime();
                                        post.comments.push({ uuid, uploaderInfo, postText, attachmentsPaths, timestamp });


                                        json = JSON.stringify(socialNetworkPosts); //convert it back to json
                                        fs.writeFile('data/socialNetworkPosts.txt', json, 'utf8', (err) => {
                                            if (err)
                                                logging.consoleLog('Error written to file!');
                                            logging.consoleLog('Data written to file');
                                        }); // write it back



                                    }


                                }, 1000);
                            }

                        });

                        req.busboy.on('file', (fieldname, file, filename) => {
                            onlyText = false;

                            avtFolderPath = `./public/SocialNetwork/me/${uuid}/comments/`;
                            avtFilePath = `./public/SocialNetwork/me/${uuid}/comments/comment_${str.userInfo.postCount}_id_.${filename.filename}`;

                            tempFiles.push(avtFilePath);
                            numberOfFiles++;
                            totalFiles++;
                            fs.mkdirSync(avtFolderPath, { recursive: true });

                            // Create a write stream of the new file
                            const fstream = fs.createWriteStream(avtFilePath);
                            // Pipe it trough
                            file.pipe(fstream);
                            let fileSize = 0;
                            let maxFileSize = 1073741824;  //1GB

                            file.on('data', (data) => {
                                fileSize += data.length;
                                if (fileSize > maxFileSize) {
                                    logging.consoleLog(`Exceed limit! Aborting...`);
                                    // File size exceeds limit, reject the upload
                                    try {
                                        //TODO: get user space left in the API below, subtract to the total and figure a way to stop it mid-stream
                                        file.resume(); // Discard remaining data
                                        fstream.end(); // Close the write stream
                                        file.unpipe(fstream);
                                        req.unpipe(busboy);
                                        return;
                                    }
                                    catch (e) {
                                    }
                                }
                            });


                            // On finish of the upload
                            fstream.on('close', () => {

                                numberOfFiles--;
                                if (numberOfFiles <= 0) {

                                    logging.consoleLog(`Received total of ${totalFiles} files`);



                                    if (fileSize > maxFileSize) {
                                        res.set("Connection", "close");
                                        res.sendStatus(413);
                                    }

                                    else {

                                        var attachmentsPaths = [];
                                        for (e = 0; e < totalFiles; e++) {
                                            const oldPath = tempFiles[e];
                                            const newPath = `./public/SocialNetwork/me/${uuid}/comments/comment_${str.userInfo.postCount}_id_${e}.${tempFiles[e].substring(tempFiles[e].lastIndexOf("."))}`;
                                            fs.renameSync(oldPath, newPath);
                                            attachmentsPaths.push(`/SocialNetwork/me/${uuid}/comments/comment_${str.userInfo.postCount}_id_${e}.${tempFiles[e].substring(tempFiles[e].lastIndexOf("."))}`)
                                        }

                                        res.redirect('back');
                                        str.userInfo.postCount++;

                                        const uploaderInfo = req.session.social.userInfo;
                                        const timestamp = new Date().getTime();
                                        post.comments.push({ uuid, uploaderInfo, postText, attachmentsPaths, timestamp });


                                        json = JSON.stringify(socialNetworkPosts); //convert it back to json
                                        fs.writeFile('data/socialNetworkPosts.txt', json, 'utf8', (err) => {
                                            if (err)
                                                logging.consoleLog('Error written to file!');
                                            logging.consoleLog('Data written to file');
                                        }); // write it back 
                                    }
                                }
                            });
                        });









                    }
                }


            }
        }
    }
});





app.route('/reacting-social/:timestamp/:uuid').post((req, res, next) => {

    if (req.session && req.session.social && req.session.social.uuid) {
        for (w = 0; w < userDataSocialNetwork.users.length; w++) {
            const str = userDataSocialNetwork.users[w];
            if (str.username === "") continue;
            if (str.username === "undefined") continue;
            const uuid = uuidGen.v5(str.username, uuidGenNamespace);
            if (uuid === req.session.social.uuid) {


                for (wa = 0; wa < socialNetworkPosts.posts.length; wa++) {
                    const str1 = socialNetworkPosts.posts[wa];
                    if (str1.timestamp == req.params.timestamp) {
                        var post = str1;










                        var reactionsSent;

                        req.pipe(req.busboy); // Pipe it through busboy


                        req.busboy.on('field', (fieldname, val) => {
                            if (fieldname === 'postText' && val.length > 0) {
                                reactionsSent = val;


                                res.redirect('back');
                                //str.userInfo.commentCount++;

                                //const uploaderInfo = req.session.social.userInfo;
                                //const timestamp = new Date().getTime();
                                post.reactions[reactionsSent]++;



                                json = JSON.stringify(socialNetworkPosts); //convert it back to json
                                fs.writeFile('data/socialNetworkPosts.txt', json, 'utf8', (err) => {
                                    if (err)
                                        logging.consoleLog('Error written to file!');
                                    logging.consoleLog('Data written to file');
                                }); // write it back




                            }

                        });
                    }
                }


            }
        }
    }
});



























app.use('/SocialNetwork/main', express.static(path.join(__dirname, 'public/SocialNetwork/main')));




// use serve index to nav public folder
//app.use('/SocialNetwork/:whatever', (req, res, next) => {
//    if (req.session && req.session.social) {
//        next();
//    } else {
//        res.redirect('/SocialNetwork/login');
//    }
//});








// use serve index to nav public folder
//app.get('/SocialNetwork/profile/:uuid', (req, res) => {

//    if (req.session && req.session.social && req.session.social.uuid) {

//        for (w = 0; w < userDataSocialNetwork.users.length; w++) {
//            const str = userDataSocialNetwork.users[w];
//            if (str.username === "") continue;
//            if (str.username === "undefined") continue;
//            const uuid = uuidGen.v5(str.username, uuidGenNamespace);
//            if (uuid === req.params.uuid) {
//                res.json({
//                    uuid: req.session.social.uuid,
//                    userData: req.session.social,
//                    uuidDest: req.params.uuid,
//                    userDataDest: str
//                });
//                return;
//            }
//        }
//    }
//    else {
//        for (w = 0; w < userDataSocialNetwork.users.length; w++) {
//            const str = userDataSocialNetwork.users[w];
//            if (str.username === "") continue;
//            if (str.username === "undefined") continue;
//            const uuid = uuidGen.v5(str.username, uuidGenNamespace);
//            if (uuid === req.params.uuid) {
//                res.json({
//                    uuid: "null",
//                    userData: "null",
//                    uuidDest: req.params.uuid,
//                    userDataDest: str
//                });
//                return;
//            }
//        }
//    }
//});

app.get('/SocialNetwork/profile/:uuid', (req, res) => {
    if (req.url.includes("postsScript.js")) {
        res.sendFile(__dirname + `/public/SocialNetwork/main/postsScript.js`);
        return;
    }
    res.sendFile(__dirname + `/public/SocialNetwork/main/profile/${(req.url.includes("style.css") ? "style.css" : req.url.includes("script.js") ? "script.js" : "index.html")}`);
});





app.get('/logout-social/:uuid', (req, res) => {

    if (req.session && req.session.social && req.session.social.uuid) {

        for (w = 0; w < userDataSocialNetwork.users.length; w++) {
            const str = userDataSocialNetwork.users[w];
            if (str.username === "") continue;
            if (str.username === "undefined") continue;
            const uuid = uuidGen.v5(str.username, uuidGenNamespace);
            if (req.session.social.uuid === null) {
                res.redirect("/SocialNetwork/login");
                return;
            }
            if (uuid === req.session.social.uuid) {
                req.session.social = null;
                res.redirect("/SocialNetwork/login")
            }
        }
    }
});






// API to get list of files
app.get('/api/social/selfProfileinfo', (req, res) => {

    if (req.session && req.session.social && req.session.social.uuid) {
        res.json({
            uuid: req.session.social.uuid,
            userData: req.session.social,
            uuidDest: "null",
            userDataDest: "null"
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

// API to get list of files
app.get('/api/social/profileinfo/:uuid', (req, res) => {

    //if (req.session.social) {
    //} else {
    //    res.status(401).send('Unauthorized');
    //}

    for (a of userDataSocialNetwork.users) {
        const uuid = uuidGen.v5(a.username, uuidGenNamespace);
        if (req.params.uuid === uuid) {

            res.json({
                uuid: uuid,
                userData: a
            });
            return;
        }
    }
    res.status(404).send('Not found.');
});

// API to get list of files
app.get('/api/social/fetchPosts', (req, res) => {

    res.json({
        posts: socialNetworkPosts.posts
    });
});

// API to get list of files
app.get('/api/social/fetchPosts/:uuid', (req, res) => {
    var userPosts = []
    for (a of socialNetworkPosts.posts) {
        if (req.params.uuid === a.uuid) {
            userPosts.push(a);
        }
    }
    res.json({
        uuid: req.params.uuid,
        posts: userPosts
    });
});

//       -----     End SocialNetwork     -----




















// Bad route handling
app.use("/ads.txt", (req, res) => {
    res.sendFile(path.join(__dirname, './public/ads.txt'));
});





app.use(vhost('vanvatcorp.com', redirectApp));

app.use('/', express.static(path.join(__dirname, './public/main-public')));



// Bad route handling
app.use((req, res, next) => {
    console.log(`[404] ${req.method} ${req.originalUrl} on ${req.headers.host}`);
    next();
});


// Last resort fallback



app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, './public/van-vat-corporation/error-code/404/index.html'));
});











//Old plain HTTP - GoDaddy SSL certificate handling on the way - GoDaddy isn't handling custom server SSL certificate anyway
//app.listen(80, "0.0.0.0", () => {
//    logging.consoleLog(`Server running at http://0.0.0.0:${80}/`);
//});




// Old Let's Encrypt way - Using viet2007ht no-ip domain - Back to the go

// Load your cert + key
const options = {
    ca: fs.readFileSync('ssltls/letsencrypt/vanvatcorp.com-chain-only.pem'),
    key: fs.readFileSync('ssltls/letsencrypt/vanvatcorp.com-key.pem'),
    cert: fs.readFileSync('ssltls/letsencrypt/vanvatcorp.com-crt.pem') // use fullchain if combined
};

var httpsServer = https.createServer(options, app);
httpsServer.listen(443, () => {
    logging.consoleLog('✅ HTTPS server running at https://www.vanvatcorp.com/');
});


var httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: "https://" + req.headers.host + req.url });
    res.end();
});
httpServer.listen(80);