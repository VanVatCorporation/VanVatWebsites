const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

// Register Route
router.post('/api/vanvatcorp/book/register', (req, res) => {
    const { accountUsername, accountPassword } = req.body;
    const hashedPassword = bcrypt.hashSync(accountPassword, 8);

    const query = 'INSERT INTO users (accountUsername, accountPassword) VALUES (?, ?)';
    db.accountSQL.query(query, [accountUsername, hashedPassword], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully');
    });
});

// Login Route
router.post('/api/vanvatcorp/book/login', (req, res) => {
    const { accountUsername, accountPassword } = req.body;

    const query = 'SELECT * FROM users WHERE accountUsername = ?';
    db.accountSQL.query(query, [accountUsername], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(400).json({ returnResult: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(accountPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ returnResult: 'Invalid password' });
        }

        res.json({ returnResult: 'Login successful' });
    });
});

module.exports = router;
