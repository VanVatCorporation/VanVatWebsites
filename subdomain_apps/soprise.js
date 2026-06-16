const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const db = require('../modules/config/db');
const { authenticateToken } = require('../modules/middleware/auth');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use('/', express.static(path.join(__dirname, '../public/van-vat-corporation/soprise')));

/**
 * GET /api/products
 * Fetch all products (optional: filtering by category)
 */
app.get('/api/products', (req, res) => {
    const { category } = req.query;
    let query = 'SELECT * FROM products';
    const params = [];

    if (category) {
        query += ' WHERE categoryId = ?';
        params.push(category);
    }

    db.sopriseSQL.query(query, params, (err, results) => {
        if (err) {
            logging.consoleError('Error fetching products:', err);
            return res.status(500).json({ error: 'Database error', success: false });
        }
        res.json({ success: true, products: results });
    });
});

/**
 * GET /api/categories
 * Fetch all categories
 */
app.get('/api/categories', (req, res) => {
    db.sopriseSQL.query('SELECT * FROM categories', (err, results) => {
        if (err) {
            logging.consoleError('Error fetching categories:', err);
            return res.status(500).json({ error: 'Database error', success: false });
        }
        res.json({ success: true, categories: results });
    });
});

/**
 * GET /api/user/soprise-profile
 * Fetch user's Soprise-specific data (Cart, Wishlist, etc.)
 */
app.get('/api/user/soprise-profile', authenticateToken, (req, res) => {
    const query = 'SELECT * FROM users_soprise WHERE accountUUID = ?';
    db.accountSQL.query(query, [req.user.id], (err, results) => {
        if (err) {
            logging.consoleError('Error fetching user soprise profile:', err);
            return res.status(500).json({ error: 'Database error', success: false });
        }

        if (results.length === 0) {
            // Create initial profile if doesn't exist
            const insertQuery = 'INSERT INTO users_soprise (accountUUID, cart, wishlist, orderHistory) VALUES (?, ?, ?, ?)';
            const emptyData = JSON.stringify([]);
            db.accountSQL.query(insertQuery, [req.user.id, emptyData, emptyData, emptyData], (err) => {
                if (err) {
                    logging.consoleError('Error creating user soprise profile:', err);
                    return res.status(500).json({ error: 'Database error', success: false });
                }
                return res.json({
                    success: true,
                    data: { cart: [], wishlist: [], orderHistory: [] }
                });
            });
        } else {
            res.json({
                success: true,
                data: {
                    cart: JSON.parse(results[0].cart || '[]'),
                    wishlist: JSON.parse(results[0].wishlist || '[]'),
                    orderHistory: JSON.parse(results[0].orderHistory || '[]')
                }
            });
        }
    });
});

/**
 * POST /api/user/cart
 * Update user's cart
 */
app.post('/api/user/cart', authenticateToken, (req, res) => {
    const { cart } = req.body;
    if (!cart || !Array.isArray(cart)) {
        return res.status(400).json({ error: 'Invalid cart data', success: false });
    }

    const query = 'UPDATE users_soprise SET cart = ? WHERE accountUUID = ?';
    db.accountSQL.query(query, [JSON.stringify(cart), req.user.id], (err) => {
        if (err) {
            logging.consoleError('Error updating cart:', err);
            return res.status(500).json({ error: 'Database error', success: false });
        }
        res.json({ success: true, message: 'Cart updated successfully' });
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;