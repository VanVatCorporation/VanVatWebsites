const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const app = express();

const account = require('../subdomain_apps/account');



//       -----     SocialNetwork     -----


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




    const uuid = uuidGen.v5(username, account.uuidGenNamespace);

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
            const uuid = uuidGen.v5(username, account.uuidGenNamespace);



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
            const uuid = uuidGen.v5(str.username, account.uuidGenNamespace);
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
            const uuid = uuidGen.v5(str.username, account.uuidGenNamespace);
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
            const uuid = uuidGen.v5(str.username, account.uuidGenNamespace);
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
            const uuid = uuidGen.v5(str.username, account.uuidGenNamespace);
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
            const uuid = uuidGen.v5(str.username, account.uuidGenNamespace);
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
//            const uuid = uuidGen.v5(str.username, account.uuidGenNamespace);
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
//            const uuid = uuidGen.v5(str.username, account.uuidGenNamespace);
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
            const uuid = uuidGen.v5(str.username, account.uuidGenNamespace);
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
        const uuid = uuidGen.v5(a.username, account.uuidGenNamespace);
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


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});


module.exports = app;