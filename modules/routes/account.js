const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uuidGen = require('uuid');
const db = require('../config/db');
const logging = require('../utils/log');
const { authenticateToken, generateToken, setAuthCookie, clearAuthCookie } = require('../middleware/auth');

const uuidGenNamespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

// Helper for national ID hashing preparation
function fromNumToText(str) {
    if (!str) return '';
    const digitMap = {
        '0': 'zero', '1': 'one', '2': 'two', '3': 'three',
        '4': 'four', '5': 'five', '6': 'six',
        '7': 'seven', '8': 'eight', '9': 'nine'
    };

    return str
        .split('')
        .map(char => digitMap[char] || char)
        .join('-');
}

// Configure multer for avatar uploads
const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create user-specific avatar directory
        const userId = req.user.id;
        const avatarDir = path.join(__dirname, '../../data/van-vat-corporation/account', userId.toString(), 'avatar');

        if (!fs.existsSync(avatarDir)) {
            fs.mkdirSync(avatarDir, { recursive: true });
        }

        cb(null, avatarDir);
    },
    filename: (req, file, cb) => {
        // Keep original extension
        const ext = path.extname(file.originalname);
        cb(null, `avatar${ext}`);
    }
});

const avatarUpload = multer({
    storage: avatarStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Only allow image files
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

/**
 * POST /api/register
 * Register a new user account
 * 
 * EXTENSIBILITY NOTE: When adding new user fields:
 * 1. Add field validation here
 * 2. Update the INSERT query to include new field
 * 3. Update the database schema (ALTER TABLE users ADD COLUMN ...)
 * 4. Update frontend registration form
 */
router.post('/register', async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            firstName,
            lastName,
            location,
            nationalID,
            gender,
            birthdate
        } = req.body;

        // Validate required fields
        if (!username || !email || !password || !firstName || !lastName) {
            return res.status(400).json({
                error: 'Missing required fields',
                success: false
            });
        }

        // Logic from old account.js
        const accountUUID = uuidGen.v5(username, uuidGenNamespace);
        const globalTierID = 1; // Average user
        const reputationScore = (nationalID === '' || !nationalID) ? 5 : 100;

        let birthdateYYYYMMDD = null;
        if (birthdate) {
            const date = new Date(birthdate);
            const yyyy = date.getFullYear();
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            birthdateYYYYMMDD = `${yyyy}-${mm}-${dd}`;
        }

        // Check if username already exists
        const checkUsername = 'SELECT accountUUID FROM users WHERE accountUUID = ?';
        db.accountSQL.query(checkUsername, [accountUUID], async (err, results) => {
            if (err) {
                logging.consoleError('Database error checking username:', err);
                return res.status(500).json({ error: 'Database error', success: false });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    error: 'Username is already taken',
                    success: false
                });
            }

            // Check if email already exists
            const checkEmail = 'SELECT accountUUID FROM users WHERE accountEmail = ?';
            db.accountSQL.query(checkEmail, [email], async (err, results) => {
                if (err) {
                    logging.consoleError('Database error checking email:', err);
                    return res.status(500).json({ error: 'Database error', success: false });
                }

                if (results.length > 0) {
                    return res.status(400).json({
                        error: 'Email already exists',
                        success: false
                    });
                }

                // Hash password and nationalID
                const hashedPassword = bcrypt.hashSync(password, 12);
                const slightlyModifiedNationalID = fromNumToText(nationalID || '');
                const hashedNationalID = nationalID ? bcrypt.hashSync(slightlyModifiedNationalID, 12) : null;

                // Insert new user - using correct column names from vanvataccounts
                const insertQuery = `
                    INSERT INTO users 
                    (accountUUID, accountUsername, accountPassword, accountEmail, legalBirthday, gender, countryCode, nationalID, globalTierID, firstName, lastName, reputationScore, bio, avatarUrl, createdAt, updatedAt)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
                `;

                const values = [
                    accountUUID,
                    username,
                    hashedPassword,
                    email,
                    birthdateYYYYMMDD,
                    gender || null,
                    location || null,
                    hashedNationalID,
                    globalTierID,
                    firstName,
                    lastName,
                    reputationScore,
                    '', // Default empty bio
                    null // No avatar initially
                ];

                db.accountSQL.query(insertQuery, values, (err, result) => {
                    if (err) {
                        logging.consoleError('Database error creating user:', err);
                        return res.status(500).json({ error: 'Failed to create user', success: false });
                    }

                    // Generate JWT token using UUID
                    const user = {
                        id: accountUUID,  // Using UUID as ID
                        username,
                        email
                    };

                    const token = generateToken(user);
                    setAuthCookie(res, token);

                    logging.consoleLog(`New user registered: ${username} (UUID: ${accountUUID})`);

                    res.status(201).json({
                        success: true,
                        message: 'Registration successful',
                        user: {
                            id: accountUUID,
                            username: username,
                            email: email
                        }
                    });
                });
            });
        });
    } catch (error) {
        logging.consoleError('Registration error:', error);
        res.status(500).json({ error: 'Server error', success: false });
    }
});

/**
 * POST /api/login
 * Login to user account
 */
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
                success: false
            });
        }

        // Search by email or username
        const query = 'SELECT * FROM users WHERE accountEmail = ? OR accountUsername = ?';
        db.accountSQL.query(query, [email, email], (err, results) => {
            if (err) {
                logging.consoleError('Database error during login:', err);
                return res.status(500).json({ error: 'Database error', success: false });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    error: 'Invalid email or password',
                    success: false
                });
            }

            const user = results[0];

            // Verify password
            const isPasswordValid = bcrypt.compareSync(password, user.accountPassword);
            if (!isPasswordValid) {
                return res.status(401).json({
                    error: 'Invalid email or password',
                    success: false
                });
            }

            // Generate JWT token using accountUUID
            const tokenUser = {
                id: user.accountUUID,  // Using UUID as ID
                username: user.accountUsername,
                email: user.accountEmail
            };

            const token = generateToken(tokenUser);
            setAuthCookie(res, token);

            logging.consoleLog(`User logged in: ${user.accountUsername} (UUID: ${user.accountUUID})`);

            res.json({
                success: true,
                message: 'Login successful',
                user: {
                    id: user.accountUUID,
                    username: user.accountUsername,
                    email: user.accountEmail,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        });
    } catch (error) {
        logging.consoleError('Login error:', error);
        res.status(500).json({ error: 'Server error', success: false });
    }
});

/**
 * POST /api/logout
 * Logout user by clearing auth cookie
 */
router.post('/logout', (req, res) => {
    clearAuthCookie(res);
    res.json({ success: true, message: 'Logged out successfully' });
});

/**
 * GET /api/profile
 * Get current user's profile (protected route)
 */
router.get('/profile', authenticateToken, (req, res) => {
    const query = 'SELECT accountUUID as id, accountUsername as username, accountEmail as email, firstName, lastName, bio, avatarUrl, reputationScore as reputation, countryCode as location, gender, legalBirthday as birthdate, createdAt FROM users WHERE accountUUID = ?';

    db.accountSQL.query(query, [req.user.id], (err, results) => {
        if (err) {
            logging.consoleError('Database error fetching profile:', err);
            return res.status(500).json({ error: 'Database error', success: false });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found', success: false });
        }

        const user = results[0];

        // Format avatar URL if exists
        if (user.avatarUrl) {
            user.avatarUrl = `/api/avatar/${user.id}`;
        }

        res.json({
            success: true,
            user
        });
    });
});

/**
 * PUT /api/profile
 * Update current user's profile (protected route)
 * 
 * EXTENSIBILITY NOTE: When adding new editable user fields:
 * 1. Add field to the UPDATE query
 * 2. Update frontend account center edit form
 * 3. Add validation if needed
 */
router.put('/profile', authenticateToken, (req, res) => {
    const { firstName, lastName, bio, location, gender, birthdate, nationalID } = req.body;

    let birthdateYYYYMMDD = null;
    if (birthdate) {
        const date = new Date(birthdate);
        // Ensure valid date
        if (!isNaN(date.getTime())) {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            birthdateYYYYMMDD = `${yyyy}-${mm}-${dd}`;
        }
    }

    // Process National ID if provided
    let hashedNationalID = undefined;
    if (nationalID && nationalID.trim() !== '') {
        const slightlyModifiedNationalID = fromNumToText(nationalID);
        hashedNationalID = bcrypt.hashSync(slightlyModifiedNationalID, 12);
    }

    // Dynamic query construction to handle optional National ID update
    let updateQuery = `
        UPDATE users 
        SET firstName = ?, lastName = ?, bio = ?, countryCode = ?, gender = ?, legalBirthday = ?, updatedAt = NOW()
    `;

    const values = [
        firstName || '',
        lastName || '',
        bio || '',
        location || null,
        (gender !== undefined && gender !== null) ? gender : null,
        birthdateYYYYMMDD
    ];

    if (hashedNationalID) {
        updateQuery += `, nationalID = ? `;
        values.push(hashedNationalID);
    }

    updateQuery += ` WHERE accountUUID = ?`;
    values.push(req.user.id);

    db.accountSQL.query(updateQuery, values, (err, result) => {
        if (err) {
            logging.consoleError('Database error updating profile:', err);
            return res.status(500).json({ error: 'Failed to update profile', success: false });
        }

        logging.consoleLog(`Profile updated for user ID: ${req.user.id}`);

        res.json({
            success: true,
            message: 'Profile updated successfully'
        });
    });
});

/**
 * POST /api/avatar
 * Upload user avatar (protected route)
 */
router.post('/avatar', authenticateToken, avatarUpload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded', success: false });
    }

    // Update database with avatar path
    const avatarUrl = `data/van-vat-corporation/account/${req.user.id}/avatar/avatar${path.extname(req.file.originalname)}`;

    const updateQuery = 'UPDATE users SET avatarUrl = ?, updatedAt = NOW() WHERE accountUUID = ?';

    db.accountSQL.query(updateQuery, [avatarUrl, req.user.id], (err, result) => {
        if (err) {
            logging.consoleError('Database error updating avatar:', err);
            return res.status(500).json({ error: 'Failed to update avatar', success: false });
        }

        logging.consoleLog(`Avatar uploaded for user ID: ${req.user.id}`);

        res.json({
            success: true,
            message: 'Avatar uploaded successfully',
            avatarUrl: `/api/avatar/${req.user.id}`
        });
    });
});

/**
 * GET /api/avatar/:userId
 * Get user avatar image
 */
router.get('/avatar/:userId', (req, res) => {
    const query = 'SELECT avatarUrl FROM users WHERE accountUUID = ?';

    db.accountSQL.query(query, [req.params.userId], (err, results) => {
        if (err || results.length === 0 || !results[0].avatarUrl) {
            // Return default avatar
            return res.sendFile(path.join(__dirname, '../../public-res/res/default-avatar.png'));
        }

        const avatarPath = path.join(__dirname, "../../", results[0].avatarUrl);

        if (fs.existsSync(avatarPath)) {
            res.sendFile(avatarPath);
        } else {
            // Return default avatar if file not found
            res.sendFile(path.join(__dirname, '../../public-res/res/default-avatar.png'));
        }
    });
});

/**
 * DELETE /api/profile
 * Delete current user's account (protected route)
 */
router.delete('/profile', authenticateToken, (req, res) => {
    // Delete user from database
    const query = 'DELETE FROM users WHERE accountUUID = ?';

    db.accountSQL.query(query, [req.user.id], (err, result) => {
        if (err) {
            logging.consoleError('Database error deleting account:', err);
            return res.status(500).json({ error: 'Failed to delete account', success: false });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found', success: false });
        }

        // Clear auth cookie
        clearAuthCookie(res);

        logging.consoleLog(`Account deleted for user ID: ${req.user.id}`);

        res.json({
            success: true,
            message: 'Account deleted successfully'
        });
    });
});

/**
 * GET /api/verify-token
 * Verify if current JWT token is valid
 */
router.get('/verify-token', authenticateToken, (req, res) => {
    res.json({
        valid: true,
        user: {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email
        }
    });
});

module.exports = router;
