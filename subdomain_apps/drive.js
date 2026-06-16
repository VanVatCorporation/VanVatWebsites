const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const disk = require('diskusage');
const busboy = require('connect-busboy');
const serveIndex = require('serve-index');
const app = express();

app.use('/', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-drive')));
app.use('/read-only', express.static(path.join(__dirname, '../data/van-vat-corporation/van-vat-drive/read-only')));

const serveIndexOptions = { hidden: true, icons: true, stylesheet: path.join(__dirname, '../public-res/res/serveIndex/GlobalDriveServe/style.css'), template: path.join(__dirname, '../public-res/res/serveIndex/GlobalDriveServe/directory.html') };

// Serve the uploaded files statically
app.use('/global', express.static(path.join(__dirname, '../data/Uploader/uploads')));
// use serve index to nav public folder
app.use('/global', serveIndex(path.join(__dirname, '../data/Uploader/uploads'), serveIndexOptions));



app.use(busboy({
    highWaterMark: 256 * 1024 * 1024, // Set 256MiB buffer
})); // Insert the busboy middle-ware


//       ====================     VanVatDrive     ====================


const diskInfoPath = 'D:/';







//       -----     Uploader     -----






// Set up storage engine
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../data/Uploader/uploadsTemp/'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

//const storageFolder = multer.diskStorage({
//    destination: (req, file, cb) => {
//        const folderName = req.body.folderName;
//        const uploadPath = './public/Uploader/uploads/' + folderName;
//        fs.mkdirSync(uploadPath, { recursive: true });
//        cb(null, uploadPath);
//        logging.consoleLog("ghh: " + folderName);
//        logging.consoleLog("ghhs: " + uploadPath);
//    },
//    filename: (req, file, cb) => {
//        cb(null, file.originalname);
//    }
//});


// Initialize upload
const upload = multer({ storage: storage });
// Initialize upload
const uploadFolder = multer({ storage: storage });









function uploadBusboy(req, res, next) {

    logging.consoleLog('User requesting Busboy Uploader Method...');

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
        var tempPath = path.join("../data/Uploader/uploadsTemp/", filename.filename);

        tempFiles.push(tempPath);
        // Create a write stream of the new file
        const fstream = fs.createWriteStream(tempPath);
        // Pipe it trough
        file.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            logging.consoleLog(`'${targetFolderC}'`);
            logging.consoleLog(`Upload of '${filename.filename}' finished`);
            numberOfFiles--;
            if (numberOfFiles <= 0) {
                tempFiles.forEach((temp) => {
                    const targetFolder = path.join(__dirname, "../data/Uploader/uploads/", targetFolderC, folderName);

                    const oldPath = temp;
                    const newPath = path.join(targetFolder, temp.substring(temp.lastIndexOf("uploadsTemp") + 12));
                    fs.mkdirSync(targetFolder, { recursive: true });
                    fs.renameSync(oldPath, newPath);
                });

                logging.consoleLog(`Received total of ${totalFile} files`);
                res.redirect('back');
            }

        });
    });
}


























app.route('/upload').post((req, res, next) => uploadBusboy(req, res, next));
app.route('/upload-folder').post((req, res, next) => uploadBusboy(req, res, next));
app.route('/upload-drag').post((req, res, next) => uploadBusboy(req, res, next));





// Handle file upload
app.post('/upload-old', upload.array('files[]'), (req, res) => {
    logging.consoleLog('User requesting Multer Uploader Method...');
    const targetFolder = path.join(__dirname, "../data/Uploader/uploads/" + req.body.targetFolder);
    if (req.file) {


        const oldPath = req.file.path;
        const newPath = path.join(targetFolder, req.file.originalname);
        fs.mkdirSync(targetFolder, { recursive: true });
        fs.renameSync(oldPath, newPath);


        logging.consoleLog('File received:', req.file);
        res.send('File uploaded successfully!');
    } else if (req.files) {

        req.files.forEach(file => {
            const oldPath = file.path;
            const newPath = path.join(targetFolder, file.originalname);
            fs.mkdirSync(targetFolder, { recursive: true });
            fs.renameSync(oldPath, newPath);
        });


        logging.consoleLog('Files received:', req.files);
        res.json({ message: 'Files received' });
        //res.send('All files uploaded successfully!');
    } else {
        res.json({ message: 'Files not received' });
        //res.send('No file uploaded.');
    }
});

// Handle folder upload
app.post('/upload-folder-old', uploadFolder.array('files[]'), (req, res) => {
    logging.consoleLog('User requesting Multer Uploader Method...');
    if (req.files.length > 0) {
        const targetFolder = req.body.targetFolder;
        const folderName = req.body.folderName;
        const folderPath = path.join(__dirname, "../data/Uploader/uploads/", targetFolder, folderName);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        req.files.forEach(file => {
            const oldPath = file.path;
            const newPath = path.join(folderPath, file.originalname);
            fs.mkdirSync(folderPath, { recursive: true });
            fs.renameSync(oldPath, newPath);
        });

        res.json({ message: 'Folder received', folderName: folderName });
        //res.send(`Files uploaded successfully to folder: ${folderName}`);
    } else {
        res.json({ message: 'Folder not received' });
        //res.send('No files uploaded.');
    }
});

app.post('/upload-drag-old', uploadFolder.array('files[]'), (req, res) => {
    logging.consoleLog('User requesting Multer Uploader Method...');
    const targetFolder = path.join(__dirname, "../data/Uploader/uploads/" + req.body.targetFolder);
    const folderName = req.body.folderName;


    req.files.forEach(file => {
        const oldPath = file.path;
        const newPath = path.join(targetFolder, file.originalname);
        fs.mkdirSync(targetFolder, { recursive: true });
        fs.renameSync(oldPath, newPath);
    });

    logging.consoleLog("Received folder name: " + folderName);
    logging.consoleLog("Received files: ", req.files);
    res.json({ message: 'Folder name and files received', folderName: folderName });
});







// API to get list of files
app.get('/api/files', (req, res) => {
    fs.readdir(path.join(__dirname, '../data/Uploader/uploads'), (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        res.json(files);
    });
});

// API to get list of files
app.get('/api/diskInfo', async (req, res) => {
    disk.check(diskInfoPath, (err, info) => {
        if (err) {
            logging.consoleError(err);
        } else {
            res.json({
                spaceTotal: (info.total),
                spaceLeft: (info.free)
                //availableSpace: (info.available)
            });
            //logging.consoleLog(`Total: ${(info.total / (1024 * 1024 * 1024)).toFixed(2)} GB`);
            //logging.consoleLog(`Free: ${(info.free / (1024 * 1024 * 1024)).toFixed(2)} GB`);
            //logging.consoleLog(`Available: ${(info.available / (1024 * 1024 * 1024)).toFixed(2)} GB`);
        }
    });
});




//       -----     End Uploader     -----







//       ====================     End VanVatDrive     ====================

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;