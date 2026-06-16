const jwt = require('jsonwebtoken');
const logging = require('../utils/log');

// Secret key for JWT - should be in environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || 'van-vat-corp-secret-key-2026-change-in-production';

/**
 * Middleware to verify JWT token from httpOnly cookie
 * Attaches user data to req.user if valid
 */
const authenticateToken = (req, res, next) => {
    // Get token from cookie
    const token = req.cookies?.authToken;

    if (!token) {
        return res.status(401).json({
            error: 'Authentication required',
            authenticated: false
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user data to request
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        };

        next();
    } catch (error) {
        logging.consoleError('JWT verification failed:', error.message);

        // Clear invalid cookie
        res.clearCookie('authToken');

        return res.status(401).json({
            error: 'Invalid or expired token',
            authenticated: false
        });
    }
};

/**
 * Generate JWT token for user
 * @param {Object} user - User object with id, username, email
 * @param {string} expiresIn - Token expiration time (default: 7 days)
 * @returns {string} JWT token
 */
const generateToken = (user, expiresIn = '7d') => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        JWT_SECRET,
        { expiresIn }
    );
};

/**
 * Set JWT token as httpOnly cookie
 * @param {Object} res - Express response object
 * @param {string} token - JWT token
 */
const setAuthCookie = (res, token) => {
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

/**
 * Clear authentication cookie
 * @param {Object} res - Express response object
 */
const clearAuthCookie = (res) => {
    res.clearCookie('authToken');
};

module.exports = {
    authenticateToken,
    generateToken,
    setAuthCookie,
    clearAuthCookie,
    JWT_SECRET
};
