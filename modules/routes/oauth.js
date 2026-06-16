/**
 * OAuth Routes for Social Authentication
 * Supports Google, Facebook, and Apple OAuth login
 * 
 * FLOW:
 * 1. User clicks social login button
 * 2. Redirect to provider's OAuth page
 * 3. Provider redirects back with auth code
 * 4. Exchange code for user info
 * 5. Check if user exists → login or create with profileComplete=0
 * 6. If profileComplete=0, redirect to /complete-profile
 * 
 * CONFIGURATION:
 * Set these environment variables:
 * - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
 * - FACEBOOK_APP_ID, FACEBOOK_APP_SECRET
 * - APPLE_CLIENT_ID, APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuidGen = require('uuid');
const db = require('../config/db');
const logging = require('../utils/log');
const { authenticateToken, generateToken, setAuthCookie } = require('../middleware/auth');

const uuidGenNamespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

// OAuth Configuration - Replace with environment variables in production
const OAUTH_CONFIG = {
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
        redirectUri: 'https://account.vanvatcorp.com/api/auth/google/callback',
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
        // Request birthday scope: https://www.googleapis.com/auth/user.birthday.read
        scopes: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/user.birthday.read']
    },
    facebook: {
        appId: process.env.FACEBOOK_APP_ID || 'YOUR_FACEBOOK_APP_ID',
        appSecret: process.env.FACEBOOK_APP_SECRET || 'YOUR_FACEBOOK_APP_SECRET',
        redirectUri: 'https://account.vanvatcorp.com/api/auth/facebook/callback',
        authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
        tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
        userInfoUrl: 'https://graph.facebook.com/me',
        scopes: ['email', 'public_profile', 'user_birthday']
    },
    apple: {
        clientId: process.env.APPLE_CLIENT_ID || 'YOUR_APPLE_CLIENT_ID',
        teamId: process.env.APPLE_TEAM_ID || 'YOUR_APPLE_TEAM_ID',
        keyId: process.env.APPLE_KEY_ID || 'YOUR_APPLE_KEY_ID',
        privateKey: process.env.APPLE_PRIVATE_KEY || '',
        redirectUri: 'https://account.vanvatcorp.com/api/auth/apple/callback',
        authUrl: 'https://appleid.apple.com/auth/authorize'
    }
};

// Helper: Parse name into first/last name
function parseFullName(fullName) {
    if (!fullName) return { firstName: '', lastName: '' };
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) {
        return { firstName: parts[0], lastName: '' };
    }
    const lastName = parts.pop();
    const firstName = parts.join(' ');
    return { firstName, lastName };
}

// Helper: Create or login OAuth user
async function handleOAuthUser(provider, providerId, email, firstName, lastName, birthdate) {
    return new Promise((resolve, reject) => {
        // First check if user exists with this OAuth provider ID
        const checkOAuthQuery = 'SELECT * FROM users WHERE oauthProvider = ? AND oauthProviderId = ?';
        db.accountSQL.query(checkOAuthQuery, [provider, providerId], (err, results) => {
            if (err) {
                logging.consoleError('Database error checking OAuth user:', err);
                return reject({ error: 'Database error', status: 500 });
            }

            if (results.length > 0) {
                // Existing OAuth user - login
                const user = results[0];
                return resolve({
                    isNew: false,
                    user: {
                        id: user.accountUUID,
                        username: user.accountUsername,
                        email: user.accountEmail,
                        profileComplete: user.profileComplete === 1
                    }
                });
            }

            // Check if email already exists (different registration method)
            const checkEmailQuery = 'SELECT * FROM users WHERE accountEmail = ?';
            db.accountSQL.query(checkEmailQuery, [email], (err, emailResults) => {
                if (err) {
                    logging.consoleError('Database error checking email:', err);
                    return reject({ error: 'Database error', status: 500 });
                }

                if (emailResults.length > 0) {
                    // Email exists with different provider
                    const existingUser = emailResults[0];

                    // If user registered normally (no OAuth provider), we link accounts
                    if (!existingUser.oauthProvider) {
                        // Link this OAuth provider to existing account
                        const linkQuery = 'UPDATE users SET oauthProvider = ?, oauthProviderId = ?, updatedAt = NOW() WHERE accountUUID = ?';
                        db.accountSQL.query(linkQuery, [provider, providerId, existingUser.accountUUID], (err) => {
                            if (err) {
                                logging.consoleError('Database error linking OAuth:', err);
                                return reject({ error: 'Failed to link account', status: 500 });
                            }

                            logging.consoleLog(`Linked ${provider} OAuth to existing user: ${existingUser.accountUsername}`);
                            return resolve({
                                isNew: false,
                                user: {
                                    id: existingUser.accountUUID,
                                    username: existingUser.accountUsername,
                                    email: existingUser.accountEmail,
                                    profileComplete: true
                                }
                            });
                        });
                        return;
                    } else {
                        // Email used with different OAuth provider
                        return reject({
                            error: `This email is already registered with ${existingUser.oauthProvider}. Please login with ${existingUser.oauthProvider}.`,
                            status: 400
                        });
                    }
                }

                // New user - create account with profileComplete=0
                // Generate temporary username from email
                const tempUsername = email.split('@')[0] + '_' + Date.now().toString(36);
                const accountUUID = uuidGen.v5(tempUsername, uuidGenNamespace);

                // Format birthdate if available
                let birthdateFormatted = null;
                if (birthdate) {
                    const date = new Date(birthdate);
                    if (!isNaN(date.getTime())) {
                        const yyyy = date.getFullYear();
                        const mm = String(date.getMonth() + 1).padStart(2, '0');
                        const dd = String(date.getDate()).padStart(2, '0');
                        birthdateFormatted = `${yyyy}-${mm}-${dd}`;
                    }
                }

                const insertQuery = `
                    INSERT INTO users 
                    (accountUUID, accountUsername, accountPassword, accountEmail, legalBirthday, gender, countryCode, nationalID, globalTierID, firstName, lastName, reputationScore, bio, avatarUrl, oauthProvider, oauthProviderId, profileComplete, createdAt, updatedAt)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())
                `;

                const values = [
                    accountUUID,
                    tempUsername, // Temporary username, will be updated in complete-profile
                    null, // Password will be set in complete-profile
                    email,
                    birthdateFormatted,
                    null, // Gender will be set in complete-profile
                    null,
                    null,
                    1, // globalTierID - Average user
                    firstName || '',
                    lastName || '',
                    5, // Default reputation for OAuth users (no national ID)
                    '',
                    null,
                    provider,
                    providerId
                ];

                db.accountSQL.query(insertQuery, values, (err) => {
                    if (err) {
                        logging.consoleError('Database error creating OAuth user:', err);
                        return reject({ error: 'Failed to create user', status: 500 });
                    }

                    logging.consoleLog(`New OAuth user created: ${email} via ${provider} (UUID: ${accountUUID})`);
                    return resolve({
                        isNew: true,
                        user: {
                            id: accountUUID,
                            username: tempUsername,
                            email: email,
                            profileComplete: false,
                            firstName,
                            lastName,
                            birthdate: birthdateFormatted
                        }
                    });
                });
            });
        });
    });
}

// ============================================================================
// GOOGLE OAuth Routes
// ============================================================================

/**
 * GET /api/auth/google
 * Redirects to Google OAuth consent page
 */
router.get('/google', (req, res) => {
    const { clientId, redirectUri, authUrl, scopes } = OAUTH_CONFIG.google;

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: scopes.join(' '),
        access_type: 'offline',
        prompt: 'consent'
    });

    res.redirect(`${authUrl}?${params.toString()}`);
});

/**
 * GET /api/auth/google/callback
 * Handles Google OAuth callback
 */
router.get('/google/callback', async (req, res) => {
    const { code, error } = req.query;

    if (error) {
        logging.consoleError('Google OAuth error:', error);
        return res.redirect('/login?error=oauth_denied');
    }

    if (!code) {
        return res.redirect('/login?error=no_code');
    }

    try {
        const { clientId, clientSecret, redirectUri, tokenUrl, userInfoUrl } = OAUTH_CONFIG.google;

        // Exchange code for tokens
        const tokenResponse = await fetch(tokenUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            })
        });

        const tokens = await tokenResponse.json();

        if (tokens.error) {
            logging.consoleError('Google token exchange error:', tokens.error);
            return res.redirect('/login?error=token_exchange_failed');
        }

        // Get user info
        const userResponse = await fetch(userInfoUrl, {
            headers: { Authorization: `Bearer ${tokens.access_token}` }
        });

        const googleUser = await userResponse.json();

        // Try to get birthday (requires user.birthday.read scope)
        let birthdate = null;
        try {
            const peopleResponse = await fetch(
                'https://people.googleapis.com/v1/people/me?personFields=birthdays',
                { headers: { Authorization: `Bearer ${tokens.access_token}` } }
            );
            const peopleData = await peopleResponse.json();
            if (peopleData.birthdays && peopleData.birthdays.length > 0) {
                const bday = peopleData.birthdays[0].date;
                if (bday && bday.year && bday.month && bday.day) {
                    birthdate = new Date(bday.year, bday.month - 1, bday.day);
                }
            }
        } catch (e) {
            logging.consoleLog('Could not fetch Google birthday:', e.message);
        }

        const { firstName, lastName } = parseFullName(googleUser.name);

        // Handle the OAuth user
        const result = await handleOAuthUser(
            'google',
            googleUser.id,
            googleUser.email,
            firstName || googleUser.given_name || '',
            lastName || googleUser.family_name || '',
            birthdate
        );

        // Generate JWT and set cookie
        const token = generateToken({
            id: result.user.id,
            username: result.user.username,
            email: result.user.email
        });
        setAuthCookie(res, token);

        // Redirect based on profile completion status
        if (result.user.profileComplete) {
            res.redirect('/account-center');
        } else {
            res.redirect('/complete-profile');
        }

    } catch (error) {
        logging.consoleError('Google OAuth error:', error);
        res.redirect('/login?error=oauth_failed');
    }
});

// ============================================================================
// FACEBOOK OAuth Routes
// ============================================================================

/**
 * GET /api/auth/facebook
 * Redirects to Facebook OAuth consent page
 */
router.get('/facebook', (req, res) => {
    const { appId, redirectUri, authUrl, scopes } = OAUTH_CONFIG.facebook;

    const params = new URLSearchParams({
        client_id: appId,
        redirect_uri: redirectUri,
        scope: scopes.join(','),
        response_type: 'code'
    });

    res.redirect(`${authUrl}?${params.toString()}`);
});

/**
 * GET /api/auth/facebook/callback
 * Handles Facebook OAuth callback
 */
router.get('/facebook/callback', async (req, res) => {
    const { code, error } = req.query;

    if (error) {
        logging.consoleError('Facebook OAuth error:', error);
        return res.redirect('/login?error=oauth_denied');
    }

    if (!code) {
        return res.redirect('/login?error=no_code');
    }

    try {
        const { appId, appSecret, redirectUri, tokenUrl, userInfoUrl } = OAUTH_CONFIG.facebook;

        // Exchange code for token
        const tokenParams = new URLSearchParams({
            client_id: appId,
            client_secret: appSecret,
            redirect_uri: redirectUri,
            code
        });

        const tokenResponse = await fetch(`${tokenUrl}?${tokenParams.toString()}`);
        const tokens = await tokenResponse.json();

        if (tokens.error) {
            logging.consoleError('Facebook token exchange error:', tokens.error);
            return res.redirect('/login?error=token_exchange_failed');
        }

        // Get user info
        const userParams = new URLSearchParams({
            access_token: tokens.access_token,
            fields: 'id,email,first_name,last_name,birthday'
        });

        const userResponse = await fetch(`${userInfoUrl}?${userParams.toString()}`);
        const fbUser = await userResponse.json();

        // Parse birthday (format: MM/DD/YYYY)
        let birthdate = null;
        if (fbUser.birthday) {
            const parts = fbUser.birthday.split('/');
            if (parts.length === 3) {
                birthdate = new Date(parts[2], parts[0] - 1, parts[1]);
            }
        }

        // Handle the OAuth user
        const result = await handleOAuthUser(
            'facebook',
            fbUser.id,
            fbUser.email,
            fbUser.first_name || '',
            fbUser.last_name || '',
            birthdate
        );

        // Generate JWT and set cookie
        const token = generateToken({
            id: result.user.id,
            username: result.user.username,
            email: result.user.email
        });
        setAuthCookie(res, token);

        // Redirect based on profile completion status
        if (result.user.profileComplete) {
            res.redirect('/account-center');
        } else {
            res.redirect('/complete-profile');
        }

    } catch (error) {
        logging.consoleError('Facebook OAuth error:', error);
        res.redirect('/login?error=oauth_failed');
    }
});

// ============================================================================
// APPLE OAuth Routes
// ============================================================================

/**
 * GET /api/auth/apple
 * Redirects to Apple Sign In page
 */
router.get('/apple', (req, res) => {
    const { clientId, redirectUri, authUrl } = OAUTH_CONFIG.apple;

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code id_token',
        scope: 'name email',
        response_mode: 'form_post'
    });

    res.redirect(`${authUrl}?${params.toString()}`);
});

/**
 * POST /api/auth/apple/callback
 * Handles Apple Sign In callback (Apple uses POST for form_post response mode)
 */
router.post('/apple/callback', express.urlencoded({ extended: true }), async (req, res) => {
    const { code, id_token, user, error } = req.body;

    if (error) {
        logging.consoleError('Apple OAuth error:', error);
        return res.redirect('/login?error=oauth_denied');
    }

    if (!code && !id_token) {
        return res.redirect('/login?error=no_code');
    }

    try {
        // Decode ID token to get user info (Apple sends user info in id_token)
        // For production, you should verify the token signature
        const tokenParts = id_token.split('.');
        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());

        const email = payload.email;
        const appleUserId = payload.sub;

        // Apple only sends user info on first authorization
        let firstName = '';
        let lastName = '';
        if (user) {
            try {
                const userData = typeof user === 'string' ? JSON.parse(user) : user;
                firstName = userData.name?.firstName || '';
                lastName = userData.name?.lastName || '';
            } catch (e) {
                logging.consoleLog('Could not parse Apple user data:', e.message);
            }
        }

        // Handle the OAuth user
        const result = await handleOAuthUser(
            'apple',
            appleUserId,
            email,
            firstName,
            lastName,
            null // Apple doesn't provide birthday
        );

        // Generate JWT and set cookie
        const token = generateToken({
            id: result.user.id,
            username: result.user.username,
            email: result.user.email
        });
        setAuthCookie(res, token);

        // Redirect based on profile completion status
        if (result.user.profileComplete) {
            res.redirect('/account-center');
        } else {
            res.redirect('/complete-profile');
        }

    } catch (error) {
        logging.consoleError('Apple OAuth error:', error);
        res.redirect('/login?error=oauth_failed');
    }
});

// ============================================================================
// Profile Completion Routes
// ============================================================================

/**
 * GET /api/auth/profile-status
 * Check if current user needs to complete their profile
 * Returns pre-filled data from OAuth provider
 */
router.get('/profile-status', authenticateToken, (req, res) => {
    const query = 'SELECT accountUsername as username, firstName, lastName, legalBirthday as birthdate, gender, profileComplete FROM users WHERE accountUUID = ?';

    db.accountSQL.query(query, [req.user.id], (err, results) => {
        if (err) {
            logging.consoleError('Database error fetching profile status:', err);
            return res.status(500).json({ error: 'Database error', success: false });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found', success: false });
        }

        const user = results[0];

        res.json({
            success: true,
            profileComplete: user.profileComplete === 1,
            prefill: {
                firstName: user.firstName,
                lastName: user.lastName,
                birthdate: user.birthdate,
                gender: user.gender
            }
        });
    });
});

/**
 * POST /api/auth/complete-profile
 * Complete profile for OAuth users
 * Required: username, password, gender, birthdate (if not already set)
 */
router.post('/complete-profile', authenticateToken, async (req, res) => {
    try {
        const {
            username,
            password,
            firstName,
            lastName,
            gender,
            birthdate,
            location,
            nationalID
        } = req.body;

        // Validate required fields
        if (!username || !password) {
            return res.status(400).json({
                error: 'Tên người dùng và mật khẩu là bắt buộc',
                success: false
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: 'Mật khẩu phải có ít nhất 6 ký tự',
                success: false
            });
        }

        // Check if user profile is already complete
        const checkQuery = 'SELECT profileComplete, legalBirthday FROM users WHERE accountUUID = ?';
        db.accountSQL.query(checkQuery, [req.user.id], async (err, results) => {
            if (err) {
                logging.consoleError('Database error:', err);
                return res.status(500).json({ error: 'Database error', success: false });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found', success: false });
            }

            const currentUser = results[0];

            // Birthdate is required if not already set from OAuth
            if (!currentUser.legalBirthday && !birthdate) {
                return res.status(400).json({
                    error: 'Ngày sinh là bắt buộc',
                    success: false
                });
            }

            // Gender is required
            if (gender === undefined || gender === null || gender === '') {
                return res.status(400).json({
                    error: 'Giới tính là bắt buộc',
                    success: false
                });
            }

            // Check if username is already taken
            const checkUsernameQuery = 'SELECT accountUUID FROM users WHERE accountUsername = ? AND accountUUID != ?';
            db.accountSQL.query(checkUsernameQuery, [username, req.user.id], async (err, usernameResults) => {
                if (err) {
                    logging.consoleError('Database error checking username:', err);
                    return res.status(500).json({ error: 'Database error', success: false });
                }

                if (usernameResults.length > 0) {
                    return res.status(400).json({
                        error: 'Tên người dùng đã được sử dụng',
                        success: false
                    });
                }

                // Hash password
                const hashedPassword = bcrypt.hashSync(password, 12);

                // Format birthdate
                let birthdateFormatted = null;
                if (birthdate) {
                    const date = new Date(birthdate);
                    if (!isNaN(date.getTime())) {
                        const yyyy = date.getFullYear();
                        const mm = String(date.getMonth() + 1).padStart(2, '0');
                        const dd = String(date.getDate()).padStart(2, '0');
                        birthdateFormatted = `${yyyy}-${mm}-${dd}`;
                    }
                }

                // Hash national ID if provided
                let hashedNationalID = null;
                if (nationalID && nationalID.trim() !== '') {
                    const fromNumToText = (str) => {
                        const digitMap = {
                            '0': 'zero', '1': 'one', '2': 'two', '3': 'three',
                            '4': 'four', '5': 'five', '6': 'six',
                            '7': 'seven', '8': 'eight', '9': 'nine'
                        };
                        return str.split('').map(char => digitMap[char] || char).join('-');
                    };
                    hashedNationalID = bcrypt.hashSync(fromNumToText(nationalID), 12);
                }

                // Regenerate UUID based on new username
                const newAccountUUID = uuidGen.v5(username, uuidGenNamespace);

                // Build update query dynamically
                let updateQuery = `
                    UPDATE users SET 
                        accountUUID = ?,
                        accountUsername = ?,
                        accountPassword = ?,
                        firstName = ?,
                        lastName = ?,
                        gender = ?,
                        countryCode = ?,
                        profileComplete = 1,
                        reputationScore = ?,
                        updatedAt = NOW()
                `;

                let values = [
                    newAccountUUID,
                    username,
                    hashedPassword,
                    firstName || '',
                    lastName || '',
                    gender,
                    location || null,
                    hashedNationalID ? 100 : 5 // Higher reputation if national ID provided
                ];

                if (birthdateFormatted) {
                    updateQuery += `, legalBirthday = ?`;
                    values.push(birthdateFormatted);
                }

                if (hashedNationalID) {
                    updateQuery += `, nationalID = ?`;
                    values.push(hashedNationalID);
                }

                updateQuery += ` WHERE accountUUID = ?`;
                values.push(req.user.id);

                db.accountSQL.query(updateQuery, values, (err) => {
                    if (err) {
                        logging.consoleError('Database error completing profile:', err);
                        return res.status(500).json({ error: 'Failed to update profile', success: false });
                    }

                    // Generate new token with updated info
                    const newToken = generateToken({
                        id: newAccountUUID,
                        username: username,
                        email: req.user.email
                    });
                    setAuthCookie(res, newToken);

                    logging.consoleLog(`Profile completed for user: ${username} (UUID: ${newAccountUUID})`);

                    res.json({
                        success: true,
                        message: 'Hoàn tất hồ sơ thành công',
                        user: {
                            id: newAccountUUID,
                            username: username,
                            email: req.user.email
                        }
                    });
                });
            });
        });

    } catch (error) {
        logging.consoleError('Complete profile error:', error);
        res.status(500).json({ error: 'Server error', success: false });
    }
});

module.exports = router;
