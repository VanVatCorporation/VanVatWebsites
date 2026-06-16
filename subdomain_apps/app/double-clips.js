// app/double-clips.js
const express = require('express');
const logging = require('../../modules/utils/log');
const sqlPool = require('../../modules/config/db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const router = express.Router();





const templateTitleIdentifier = "Uploading...ToIyEuEmNhIeUlAmgokafiordsfg";



// Temporary storage - files will be moved to final location after templateId is generated
const templateStorageTemp = multer.diskStorage({
    destination: (req, file, cb) => {
        // accountUsername is available here if client sends text fields BEFORE file fields
        const username = req.body.accountUsername || 'default';

        // Upload to a temp folder first
        const tempFolder = path.join(__dirname, '../../data/van-vat-corporation/doubleclips/templates', username, '_temp_uploads');

        if (!fs.existsSync(tempFolder)) {
            fs.mkdirSync(tempFolder, { recursive: true });
        }

        cb(null, tempFolder);
    },
    filename: (req, file, cb) => {
        // Add timestamp to prevent conflicts in temp folder
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const templateTempUpload = multer({ storage: templateStorageTemp });






// Login Route
router.post('/login', (req, res) => {
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
  INSERT IGNORE INTO users_doubleclips (accountUUID, accountData, boughtAssets, accountStatistics, accountTemplates) VALUES (?, ?, ?, ?, ?);
`;

        const userData = [user.accountUUID, "{}", "{}", "{}", "{}"]; // Replace with actual values

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


// Example route: /double-clips/1/2/3
router.get('/templates/:username/:templateId/:requestResource', (req, res) => {
    res.sendFile(path.join(__dirname, `../../data/van-vat-corporation/doubleclips/templates/${req.params.username}/${req.params.templateId}/${req.params.requestResource}`));
});

// Example route: /double-clips/1/2/3
router.get('/templates/:username/:templateId/content/:requestResource', (req, res) => {
    res.sendFile(path.join(__dirname, `../../data/van-vat-corporation/doubleclips/templates/${req.params.username}/${req.params.templateId}/content/${req.params.requestResource}`));
});











router.get('/api/fetch-ffmpeg-command/:username/:templateId', (req, res) => {


    //b.username, b.templateId, b.templateTitle, b.templateDescription, b.ffmpegCommand, b.templateDate, b.templateTotalClips, b.additionalResources 
    const query = `
      SELECT 
        ffmpegCommand
      FROM templates WHERE username = ? AND templateId = ?`;

    const userData = [req.params.username, req.params.templateId];

    sqlPool.doubleclipsSQL.query(query, userData, (err, results) => {
        if (err) {
            logging.consoleError('Error inserting/updating data:', err);
            res.json({
                returnResult: 'Upload failed'
            });
            return;
        }
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'Data not found' });
        }

        //const user = Object.assign({}, results[0].accountData, results[0].boughtAssets, results[0].accountStatistics);
        res.send(results[0].ffmpegCommand);


        //logging.consoleLog('User data successfully handled:', results1);
    });

});

router.get('/api/fetch-templates/:username', (req, res) => {


    //b.username, b.templateId, b.templateTitle, b.templateDescription, b.ffmpegCommand, b.templateDate, b.templateTotalClips, b.additionalResources 
    const query = `
      SELECT 
        b.*
      FROM templates b WHERE b.username = ?`;

    const userData = [req.params.username];

    sqlPool.doubleclipsSQL.query(query, userData, (err, results) => {
        if (err) {
            logging.consoleError('Error inserting/updating data:', err);
            res.json({
                returnResult: 'Upload failed'
            });
            return;
        }
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'Username not found' });
        }

        //const user = Object.assign({}, results[0].accountData, results[0].boughtAssets, results[0].accountStatistics);
        res.json({
            returnResult: 'Download successful',
            version: "nah.bro.not.implemented.yet",
            templateAuthor: results[0].username,
            templateId: results[0].templateId,
            templateTitle: results[0].templateTitle,
            templateDescription: results[0].templateDescription,
            ffmpegCommand: "",//results[0].ffmpegCommand
            templateSnapshotLink: `/${results[0].username}/${results[0].templateId}/preview.png`,
            templateVideoLink: `/${results[0].username}/${results[0].templateId}/preview.mp4`,
            templateTimestamp: new Date(results[0].templateDate).getTime(),
            templateDuration: 0, // Already calculated from client
            templateTotalClip: results[0].templateTotalClips,
            additionalResourceName: results[0].additionalResources,

            viewCount: results[0].viewCount,
            useCount: results[0].useCount,
            heartCount: results[0].heartCount,
            commentCount: results[0].commentCount,
            bookmarkCount: results[0].bookmarkCount,
            shareCount: results[0].shareCount,

            //accountData: user
        });


        //logging.consoleLog('User data successfully handled:', results1);
    });

});



// Route - multer uploads to temp folder first, then we move files after generating templateId
router.post('/api/post-template',
    templateTempUpload.fields([
        { name: 'videoFiles' },
        { name: 'previewFiles', maxCount: 2 }
    ]),
    async (req, res) => {
        // Now req.body is populated by multer
        const {
            accountUsername,
            accountPassword,
            templateTitle,
            templateDescription,
            ffmpegCommand,
            templateTotalClips
        } = req.body;

        logging.consoleLog('Form data received:', JSON.stringify(req.body));

        // TODO: Temporary unlock unauthorized changes
        //if (!account.checkAccountAuthorizationAndReturnIfUnauthorize(accountUsername, accountPassword, res)) return;

        // Extract filenames from uploaded files (optional)
        const files = req.files || {};
        const videoFiles = files['videoFiles'] || [];
        const previewFiles = files['previewFiles'] || [];

        let resourcesList = videoFiles.map(file => file.originalname.replace(/^\d+-/, '')); // Remove timestamp prefix
        if (resourcesList.length === 0) resourcesList = [""];

        // Generate unique templateId (async DB check)
        const templateId = await createUniqueTemplateId(
            accountUsername,
            templateTitle,
            templateDescription,
            ffmpegCommand,
            templateTotalClips,
            JSON.stringify(resourcesList)
        );

        if (templateId === null) {
            // Clean up temp files on failure
            [...videoFiles, ...previewFiles].forEach(file => {
                fs.unlink(file.path, () => { });
            });
            return res.status(400).json({ returnResult: 'Failed to create template ID' });
        }

        // Now move files from temp to final location
        const username = accountUsername || 'default';
        const contentFolder = path.join(__dirname, '../../data/van-vat-corporation/doubleclips/templates', username, templateId, 'content');
        const previewFolder = path.join(__dirname, '../../data/van-vat-corporation/doubleclips/templates', username, templateId);

        // Create destination folders
        if (!fs.existsSync(contentFolder)) {
            fs.mkdirSync(contentFolder, { recursive: true });
        }

        try {
            // Move video files to content folder
            for (const file of videoFiles) {
                const originalName = file.originalname.replace(/^\d+-/, ''); // Remove timestamp prefix
                const destPath = path.join(contentFolder, originalName);
                fs.renameSync(file.path, destPath);
            }

            // Move preview files to template root folder
            for (const file of previewFiles) {
                const originalName = file.originalname.replace(/^\d+-/, ''); // Remove timestamp prefix
                const destPath = path.join(previewFolder, originalName);
                fs.renameSync(file.path, destPath);
            }

            // logging.consoleLog('Files moved to final location:', templateId);
            return res.status(200).json({ returnResult: 'Uploaded!', templateId: templateId });

        } catch (moveErr) {
            // logging.consoleError('Error moving files:', moveErr);
            return res.status(500).json({ returnResult: 'Failed to move files' });
        }
    }
);




// --- Interaction Routes ---

router.post('/api/toggle-like', (req, res) => {
    // Expecting: { username, templateId }
    // Ideally validation against actual logged-in user should happen here.
    const { username, templateId } = req.body;

    if (!username || !templateId) {
        return res.status(400).json({ returnResult: 'Missing parameters' });
    }

    // 1. Try to INSERT (User likes the template)
    const insertQuery = `INSERT INTO template_likes (username, templateId) VALUES (?, ?)`;
    sqlPool.doubleclipsSQL.query(insertQuery, [username, templateId], (err, result) => {
        if (err) {
            // If duplicate entry, it means they already liked it -> so we UNLIKE it.
            if (err.code === 'ER_DUP_ENTRY') {
                const deleteQuery = `DELETE FROM template_likes WHERE username = ? AND templateId = ?`;
                sqlPool.doubleclipsSQL.query(deleteQuery, [username, templateId], (delErr, delResult) => {
                    if (delErr) {
                        logging.consoleError('Error removing like:', delErr);
                        return res.json({ returnResult: 'Error unliking' });
                    }

                    // Decrement count
                    const decrementQuery = `UPDATE templates SET likeCount = GREATEST(0, likeCount - 1) WHERE templateId = ?`;
                    sqlPool.doubleclipsSQL.query(decrementQuery, [templateId], () => { });

                    return res.json({ returnResult: 'Unliked', isLiked: false });
                });
            } else {
                logging.consoleError('Error adding like:', err);
                return res.json({ returnResult: 'Error liking' });
            }
        } else {
            // Success -> New Like
            // Increment count
            const incrementQuery = `UPDATE templates SET likeCount = likeCount + 1 WHERE templateId = ?`;
            sqlPool.doubleclipsSQL.query(incrementQuery, [templateId], () => { });

            return res.json({ returnResult: 'Liked', isLiked: true });
        }
    });
});

router.post('/api/toggle-bookmark', (req, res) => {
    const { username, templateId } = req.body;

    if (!username || !templateId) {
        return res.status(400).json({ returnResult: 'Missing parameters' });
    }

    const insertQuery = `INSERT INTO template_bookmarks (username, templateId) VALUES (?, ?)`;
    sqlPool.doubleclipsSQL.query(insertQuery, [username, templateId], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                const deleteQuery = `DELETE FROM template_bookmarks WHERE username = ? AND templateId = ?`;
                sqlPool.doubleclipsSQL.query(deleteQuery, [username, templateId], (delErr) => {
                    if (delErr) {
                        return res.json({ returnResult: 'Error removing bookmark' });
                    }

                    // Decrement count
                    const decrementQuery = `UPDATE templates SET bookmarkCount = GREATEST(0, bookmarkCount - 1) WHERE templateId = ?`;
                    sqlPool.doubleclipsSQL.query(decrementQuery, [templateId], () => { });

                    return res.json({ returnResult: 'Unbookmarked', isBookmarked: false });
                });
            } else {
                return res.json({ returnResult: 'Error bookmarking' });
            }
        } else {
            // Success -> New Bookmark
            // Increment count
            const incrementQuery = `UPDATE templates SET bookmarkCount = bookmarkCount + 1 WHERE templateId = ?`;
            sqlPool.doubleclipsSQL.query(incrementQuery, [templateId], () => { });

            return res.json({ returnResult: 'Bookmarked', isBookmarked: true });
        }
    });
});

router.get('/api/fetch-liked-templates/:username', (req, res) => {
    const username = req.params.username;
    // Simple pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const query = `
        SELECT t.* 
        FROM templates t
        INNER JOIN template_likes l ON t.templateId = l.templateId
        WHERE l.username = ?
        ORDER BY l.created_at DESC
        LIMIT ? OFFSET ?
    `;

    sqlPool.doubleclipsSQL.query(query, [username, limit, offset], (err, results) => {
        if (err) {
            logging.consoleError('Error fetching liked templates:', err);
            return res.json({ returnResult: 'Fetch failed' });
        }

        // Return same structure as fetch-templates
        const templates = results.map(row => ({
            returnResult: 'Download successful',
            version: "nah.bro.not.implemented.yet",
            templateAuthor: row.username,
            templateId: row.templateId,
            templateTitle: row.templateTitle,
            templateDescription: row.templateDescription,
            ffmpegCommand: "",//row.ffmpegCommand
            templateSnapshotLink: `https://app.vanvatcorp.com/doubleclips/templates/${row.username}/${row.templateId}/preview.png`,
            templateVideoLink: `https://app.vanvatcorp.com/doubleclips/templates/${row.username}/${row.templateId}/preview.mp4`,
            templateTimestamp: new Date(row.templateDate).getTime(),
            templateDuration: 0,
            templateTotalClip: row.templateTotalClips,
            additionalResourceName: row.additionalResources,
            heartCount: row.likeCount || 0,
            bookmarkCount: row.bookmarkCount || 0
        }));

        res.json(templates);
    });
});

router.get('/api/fetch-bookmarked-templates/:username', (req, res) => {
    const username = req.params.username;
    // Simple pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const query = `
        SELECT t.* 
        FROM templates t
        INNER JOIN template_bookmarks l ON t.templateId = l.templateId
        WHERE l.username = ?
        ORDER BY l.created_at DESC
        LIMIT ? OFFSET ?
    `;

    sqlPool.doubleclipsSQL.query(query, [username, limit, offset], (err, results) => {
        if (err) {
            logging.consoleError('Error fetching bookmarked templates:', err);
            return res.json({ returnResult: 'Fetch failed' });
        }

        // Return same structure as fetch-templates
        const templates = results.map(row => ({
            returnResult: 'Download successful',
            version: "nah.bro.not.implemented.yet",
            templateAuthor: row.username,
            templateId: row.templateId,
            templateTitle: row.templateTitle,
            templateDescription: row.templateDescription,
            ffmpegCommand: "",//row.ffmpegCommand
            templateSnapshotLink: `https://app.vanvatcorp.com/doubleclips/templates/${row.username}/${row.templateId}/preview.png`,
            templateVideoLink: `https://app.vanvatcorp.com/doubleclips/templates/${row.username}/${row.templateId}/preview.mp4`,
            templateTimestamp: new Date(row.templateDate).getTime(),
            templateDuration: 0,
            templateTotalClip: row.templateTotalClips,
            additionalResourceName: row.additionalResources,
            heartCount: row.likeCount || 0,
            bookmarkCount: row.bookmarkCount || 0
        }));

        res.json(templates);
    });
});



// --- View and Use Count Tracking ---

router.post('/api/increment-view', (req, res) => {
    const { templateId } = req.body;

    if (!templateId) {
        return res.status(400).json({ returnResult: 'Missing templateId' });
    }

    const query = `UPDATE templates SET viewCount = viewCount + 1 WHERE templateId = ?`;
    sqlPool.doubleclipsSQL.query(query, [templateId], (err, result) => {
        if (err) {
            logging.consoleError('Error incrementing view count:', err);
            return res.json({ returnResult: 'Error incrementing view count' });
        }

        // Fetch the new count
        const selectQuery = `SELECT viewCount FROM templates WHERE templateId = ?`;
        sqlPool.doubleclipsSQL.query(selectQuery, [templateId], (selErr, selResult) => {
            if (selErr) {
                return res.json({ returnResult: 'View incremented' });
            }
            return res.json({
                returnResult: 'View incremented',
                newViewCount: selResult[0]?.viewCount || 0
            });
        });
    });
});

router.post('/api/increment-use', (req, res) => {
    const { templateId } = req.body;

    if (!templateId) {
        return res.status(400).json({ returnResult: 'Missing templateId' });
    }

    const query = `UPDATE templates SET useCount = useCount + 1 WHERE templateId = ?`;
    sqlPool.doubleclipsSQL.query(query, [templateId], (err, result) => {
        if (err) {
            logging.consoleError('Error incrementing use count:', err);
            return res.json({ returnResult: 'Error incrementing use count' });
        }

        // Fetch the new count
        const selectQuery = `SELECT useCount FROM templates WHERE templateId = ?`;
        sqlPool.doubleclipsSQL.query(selectQuery, [templateId], (selErr, selResult) => {
            if (selErr) {
                return res.json({ returnResult: 'Use incremented' });
            }
            return res.json({
                returnResult: 'Use incremented',
                newUseCount: selResult[0]?.useCount || 0
            });
        });
    });
});


// --- Comments System with Multimedia Support ---

// Comment media storage configuration
const commentMediaStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const templateId = req.body.templateId;
        const commentId = req.body.commentId || 'temp'; // Will be replaced after generating ID

        const mediaFolder = path.join(__dirname, '../../data/van-vat-corporation/doubleclips/comments', templateId, commentId);

        if (!fs.existsSync(mediaFolder)) {
            fs.mkdirSync(mediaFolder, { recursive: true });
        }

        cb(null, mediaFolder);
    },
    filename: (req, file, cb) => {
        // Sanitize filename to prevent directory traversal
        const sanitized = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        cb(null, `${Date.now()}-${sanitized}`);
    }
});

// File filter for media types
const commentMediaFilter = (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    const allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'];

    const allAllowedTypes = [...allowedImageTypes, ...allowedVideoTypes, ...allowedAudioTypes];

    if (allAllowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const commentMediaUpload = multer({
    storage: commentMediaStorage,
    fileFilter: commentMediaFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max (will be refined per type in route)
    }
});

router.post('/api/post-comment',
    commentMediaUpload.array('mediaFiles', 5), // Max 5 media files per comment
    async (req, res) => {
        const { templateId, username, commentText, replyToCommentId } = req.body;

        if (!templateId || !username) {
            return res.status(400).json({ returnResult: 'Missing required fields' });
        }

        // Validate file sizes based on type
        const files = req.files || [];
        for (const file of files) {
            const fileType = file.mimetype.split('/')[0];
            if (fileType === 'image' && file.size > 5 * 1024 * 1024) {
                fs.unlinkSync(file.path);
                return res.status(400).json({ returnResult: 'Image file too large (max 5MB)' });
            }
            if (fileType === 'video' && file.size > 50 * 1024 * 1024) {
                fs.unlinkSync(file.path);
                return res.status(400).json({ returnResult: 'Video file too large (max 50MB)' });
            }
            if (fileType === 'audio' && file.size > 10 * 1024 * 1024) {
                fs.unlinkSync(file.path);
                return res.status(400).json({ returnResult: 'Audio file too large (max 10MB)' });
            }
        }

        // Generate unique comment ID
        const commentId = await createUniqueCommentId(
            templateId,
            username,
            commentText,
            replyToCommentId
        );

        if (!commentId) {
            files.forEach(file => fs.unlinkSync(file.path));
            return res.status(500).json({ returnResult: 'Failed to create comment' });
        }

        // Move files from temp to proper comment folder
        if (files.length > 0) {
            const oldFolder = path.join(__dirname, '../../data/van-vat-corporation/doubleclips/comments', templateId, 'temp');
            const newFolder = path.join(__dirname, '../../data/van-vat-corporation/doubleclips/comments', templateId, commentId);

            if (!fs.existsSync(newFolder)) {
                fs.mkdirSync(newFolder, { recursive: true });
            }

            for (const file of files) {
                const newPath = path.join(newFolder, path.basename(file.path));
                try {
                    fs.renameSync(file.path, newPath);

                    // Record media in database
                    const mediaType = file.mimetype.split('/')[0];
                    const insertMediaQuery = `
                        INSERT INTO comment_media (commentId, mediaType, mediaFilename, mediaSize)
                        VALUES (?, ?, ?, ?)
                    `;
                    sqlPool.doubleclipsSQL.query(insertMediaQuery, [
                        commentId,
                        mediaType,
                        path.basename(file.path),
                        file.size
                    ], (err) => {
                        if (err) logging.consoleError('Error recording media:', err);
                    });
                } catch (moveErr) {
                    logging.consoleError('Error moving media file:', moveErr);
                }
            }

            // Clean up temp folder if it exists and is empty
            try {
                if (fs.existsSync(oldFolder) && fs.readdirSync(oldFolder).length === 0) {
                    fs.rmdirSync(oldFolder);
                }
            } catch (e) {
                // Ignore cleanup errors
            }
        }

        // Increment comment count on template
        const incrementQuery = `UPDATE templates SET commentCount = commentCount + 1 WHERE templateId = ?`;
        sqlPool.doubleclipsSQL.query(incrementQuery, [templateId], () => { });

        return res.json({
            returnResult: 'Comment posted',
            commentId: commentId
        });
    }
);

router.get('/api/fetch-comments/:templateId', (req, res) => {
    const templateId = req.params.templateId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const query = `
        SELECT 
            c.*,
            GROUP_CONCAT(
                CONCAT(m.mediaType, ':', m.mediaFilename, ':', m.mediaSize)
                SEPARATOR '||'
            ) as mediaFiles
        FROM template_comments c
        LEFT JOIN comment_media m ON c.commentId = m.commentId
        WHERE c.templateId = ?
        GROUP BY c.id
        ORDER BY c.created_at DESC
        LIMIT ? OFFSET ?
    `;

    sqlPool.doubleclipsSQL.query(query, [templateId, limit, offset], (err, results) => {
        if (err) {
            logging.consoleError('Error fetching comments:', err);
            return res.json({ returnResult: 'Fetch failed' });
        }

        const comments = results.map(row => {
            // Parse media files
            let media = [];
            if (row.mediaFiles) {
                media = row.mediaFiles.split('||').map(m => {
                    const [mediaType, mediaFilename, mediaSize] = m.split(':');
                    return {
                        mediaType,
                        mediaFilename,
                        mediaSize: parseInt(mediaSize),
                        mediaUrl: `/doubleclips/comments/${templateId}/${row.commentId}/${mediaFilename}`
                    };
                });
            }

            return {
                commentId: row.commentId,
                templateId: row.templateId,
                username: row.username,
                commentText: row.commentText,
                created_at: new Date(row.created_at).getTime(),
                updated_at: new Date(row.updated_at).getTime(),
                likeCount: row.likeCount || 0,
                replyToCommentId: row.replyToCommentId,
                media: media
            };
        });

        res.json({ returnResult: 'Success', comments: comments });
    });
});

router.post('/api/toggle-comment-like', (req, res) => {
    const { username, commentId } = req.body;

    if (!username || !commentId) {
        return res.status(400).json({ returnResult: 'Missing parameters' });
    }

    const insertQuery = `INSERT INTO comment_likes (username, commentId) VALUES (?, ?)`;
    sqlPool.doubleclipsSQL.query(insertQuery, [username, commentId], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                // Already liked - remove like
                const deleteQuery = `DELETE FROM comment_likes WHERE username = ? AND commentId = ?`;
                sqlPool.doubleclipsSQL.query(deleteQuery, [username, commentId], (delErr) => {
                    if (delErr) {
                        return res.json({ returnResult: 'Error unliking comment' });
                    }

                    const decrementQuery = `UPDATE template_comments SET likeCount = GREATEST(0, likeCount - 1) WHERE commentId = ?`;
                    sqlPool.doubleclipsSQL.query(decrementQuery, [commentId], () => { });

                    return res.json({ returnResult: 'Comment unliked', isLiked: false });
                });
            } else {
                return res.json({ returnResult: 'Error liking comment' });
            }
        } else {
            // New like
            const incrementQuery = `UPDATE template_comments SET likeCount = likeCount + 1 WHERE commentId = ?`;
            sqlPool.doubleclipsSQL.query(incrementQuery, [commentId], () => { });

            return res.json({ returnResult: 'Comment liked', isLiked: true });
        }
    });
});

router.delete('/api/delete-comment', (req, res) => {
    const { username, commentId } = req.body;

    if (!username || !commentId) {
        return res.status(400).json({ returnResult: 'Missing parameters' });
    }

    // Verify ownership
    const checkQuery = `SELECT templateId, username FROM template_comments WHERE commentId = ?`;
    sqlPool.doubleclipsSQL.query(checkQuery, [commentId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ returnResult: 'Comment not found' });
        }

        const comment = results[0];
        if (comment.username !== username) {
            return res.status(403).json({ returnResult: 'Unauthorized' });
        }

        // Delete comment (cascade will delete media records and likes)
        const deleteQuery = `DELETE FROM template_comments WHERE commentId = ?`;
        sqlPool.doubleclipsSQL.query(deleteQuery, [commentId], (delErr) => {
            if (delErr) {
                logging.consoleError('Error deleting comment:', delErr);
                return res.json({ returnResult: 'Error deleting comment' });
            }

            // Decrement comment count on template
            const decrementQuery = `UPDATE templates SET commentCount = GREATEST(0, commentCount - 1) WHERE templateId = ?`;
            sqlPool.doubleclipsSQL.query(decrementQuery, [comment.templateId], () => { });

            // Delete media files
            const mediaFolder = path.join(__dirname, '../../data/van-vat-corporation/doubleclips/comments', comment.templateId, commentId);
            if (fs.existsSync(mediaFolder)) {
                try {
                    fs.rmSync(mediaFolder, { recursive: true, force: true });
                } catch (fsErr) {
                    logging.consoleError('Error deleting media folder:', fsErr);
                }
            }

            return res.json({ returnResult: 'Comment deleted' });
        });
    });
});

// Serve comment media files
router.get('/comments/:templateId/:commentId/:mediaFilename', (req, res) => {
    const { templateId, commentId, mediaFilename } = req.params;
    const filePath = path.join(__dirname, '../../data/van-vat-corporation/doubleclips/comments', templateId, commentId, mediaFilename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Media not found');
    }
});


// --- Helper Function for Comment ID Generation ---

function generateCommentId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    const now = Math.floor(Date.now() / 1000);
    let timePart = '';
    let temp = now;
    for (let i = 0; i < 4; i++) {
        timePart = chars[temp % 62] + timePart;
        temp = Math.floor(temp / 62);
    }

    let randomPart = '';
    for (let i = 0; i < 8; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return 'c_' + timePart + randomPart; // prefix with 'c_' to distinguish from template IDs
}

async function isCommentIdTaken(id) {
    return new Promise((resolve) => {
        sqlPool.doubleclipsSQL.query(
            "SELECT EXISTS(SELECT 1 FROM template_comments WHERE commentId = ?) AS idExists",
            [id], (err, results) => {
                if (err) {
                    logging.consoleError('Error checking comment ID:', err);
                    resolve(true);
                } else {
                    resolve(results[0].idExists === 1);
                }
            });
    });
}

async function createUniqueCommentId(templateId, username, commentText, replyToCommentId) {
    let id = generateCommentId();

    while (await isCommentIdTaken(id)) {
        id = generateCommentId();
    }

    const insertQuery = `
        INSERT INTO template_comments (commentId, templateId, username, commentText, replyToCommentId)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [id, templateId, username, commentText || '', replyToCommentId || null];

    try {
        await sqlPool.doubleclipsSQL.promise().query(insertQuery, values);
        return id;
    } catch (err) {
        logging.consoleError('Error creating comment:', err);
        return null;
    }
}
















router.get('/api/fetch-templates', (req, res) => {
    const query = `
      SELECT 
        *
      FROM templates`;

    sqlPool.doubleclipsSQL.query(query, (err, results) => {
        if (err) {
            logging.consoleError('Error fetching data:', err);
            return res.json({ returnResult: 'Fetch failed' });
        }
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'No templates found' });
        }

        // Map all rows into an array of objects
        const templates = results.map(row => ({
            returnResult: 'Download successful',
            version: "nah.bro.not.implemented.yet",
            templateAuthor: row.username,
            templateId: row.templateId,
            templateTitle: row.templateTitle,
            templateDescription: row.templateDescription,
            ffmpegCommand: "",//row.ffmpegCommand
            templateSnapshotLink: `https://app.vanvatcorp.com/doubleclips/templates/${row.username}/${row.templateId}/preview.png`,
            templateVideoLink: `https://app.vanvatcorp.com/doubleclips/templates/${row.username}/${row.templateId}/preview.mp4`,
            templateTimestamp: new Date(row.templateDate).getTime(),
            templateDuration: 0,
            templateTotalClip: row.templateTotalClips,
            additionalResourceName: row.additionalResources,
            viewCount: row.viewCount || 0,
            useCount: row.useCount || 0,
            heartCount: row.likeCount || 0,
            bookmarkCount: row.bookmarkCount || 0,
            commentCount: row.commentCount || 0
        }));

        res.json(templates); // return array
    });
});

router.get('/api/fetch-issues', (req, res) => {
    const query = `
      SELECT 
        b.issues
      FROM issues b`;

    sqlPool.doubleclipsSQL.query(query, (err, results) => {
        if (err) {
            logging.consoleError('Error fetching data:', err);
            return res.json({ returnResult: 'Fetch failed' });
        }
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'No issues found' });
        }


        // Map all rows into an array of objects
        const templates = results.map(row => row.issues);

        res.json(templates); // return array
    });
});










// idGenerator.js
function generateTemplateId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

    // --- First 4 chars: timestamp ---
    const now = Math.floor(Date.now() / 1000);
    let timePart = '';
    let temp = now;
    for (let i = 0; i < 4; i++) {
        timePart = chars[temp % 62] + timePart;
        temp = Math.floor(temp / 62);
    }

    // --- Remaining 8 chars: random ---
    let randomPart = '';
    for (let i = 0; i < 8; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return timePart + randomPart; // total length = 12
}
async function isIdTaken(id) {
    return new Promise((resolve, reject) => {
        sqlPool.doubleclipsSQL.query(
            "SELECT EXISTS(SELECT 1 FROM templates WHERE templateId = ?) AS idExists",
            [id], (err, results) => {
                if (err) {
                    logging.consoleError('Error checking ID:', err);
                    // If SQL failed to connect, then resolve true to regenerate the Id, maybe next time SQL will respond.
                    resolve(true);
                }
                else {
                    resolve(results[0].idExists === 1);
                }
            });
    });
}

// --- Ensure uniqueness ---
async function createUniqueTemplateId(username, templateTitle, templateDescription, ffmpegCommand, templateTotalClips, additionalResources) {
    let id = generateTemplateId();

    while (await isIdTaken(id)) {
        id = generateTemplateId();
    }

    const insertOrUpdateQuery = `
INSERT INTO templates (username, templateId, templateTitle, templateDescription, ffmpegCommand, templateDate, templateTotalClips, additionalResources) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`;

    const userData = [username, id, templateTitle, templateDescription, ffmpegCommand, new Date().toISOString().slice(0, 19).replace('T', ' '), templateTotalClips, additionalResources]; // Replace with actual values

    sqlPool.doubleclipsSQL.promise().query(insertOrUpdateQuery, userData, (err, results) => {
        if (err) {
            logging.consoleError('Error inserting/updating data:', err);
            id = null;
        }

    });

    return id;

}




// --- Release Management ---

const releasesDir = path.join(__dirname, '../../data/van-vat-corporation/doubleclips/releases');

router.get('/api/fetch-releases', (req, res) => {
    const platforms = ['macOS', 'Windows', 'Android'];
    const result = {};

    platforms.forEach(platform => {
        const platformPath = path.join(releasesDir, platform);
        if (fs.existsSync(platformPath)) {
            try {
                const files = fs.readdirSync(platformPath)
                    .filter(file => !file.startsWith('.') && fs.lstatSync(path.join(platformPath, file)).isFile()) // Filter hidden files and directories
                    .map(file => {
                        const stats = fs.statSync(path.join(platformPath, file));
                        return {
                            filename: file,
                            date: stats.mtime,
                            size: stats.size
                        };
                    })
                    .sort((a, b) => b.date - a.date);

                result[platform] = {
                    latest: files.length > 0 ? files[0] : null,
                    older: files.length > 1 ? files.slice(1) : []
                };
            } catch (err) {
                logging.consoleError(`Error reading platform ${platform}:`, err);
                result[platform] = { latest: null, older: [] };
            }
        } else {
            result[platform] = { latest: null, older: [] };
        }
    });

    res.json(result);
});

router.get('/api/download/:platform/:filename', (req, res) => {
    const { platform, filename } = req.params;
    const platforms = ['macOS', 'Windows', 'Android'];
    
    if (!platforms.includes(platform)) {
        return res.status(400).send('Invalid platform');
    }

    const safeFilename = path.basename(filename);
    const filePath = path.join(releasesDir, platform, safeFilename);

    if (fs.existsSync(filePath)) {
        res.download(filePath, safeFilename);
    } else {
        res.status(404).send('File not found');
    }
});

// 404 handler for anything under /double-clips
router.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, '../../public/van-vat-corporation/error-code/404/index.html')
    );
});


module.exports = router;
