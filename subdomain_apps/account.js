const express = require('express');
const logging = require('../modules/utils/log');
const path = require('path');
const cookieParser = require('cookie-parser');
const accountRoutes = require('../modules/routes/account');
const oauthRoutes = require('../modules/routes/oauth');
const app = express();

// Parse cookies for JWT authentication
app.use(cookieParser());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for login page
app.use('/login', express.static(path.join(__dirname, '../public/van-vat-corporation/login')));

// Serve static files for register page
app.use('/register', express.static(path.join(__dirname, '../public/van-vat-corporation/register')));

// Serve static files for account center
app.use('/account-center', express.static(path.join(__dirname, '../public/van-vat-corporation/account/account-center')));

// Serve static files for request deletion page
app.use('/request-deletion', express.static(path.join(__dirname, '../public/van-vat-corporation/account/request-deletion')));

// Serve static files for complete-profile page (social login profile completion)
app.use('/complete-profile', express.static(path.join(__dirname, '../public/van-vat-corporation/account/complete-profile')));

// Serve registration JavaScript
app.get('/register/register.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/van-vat-corporation/register/register.js'));
});

// Serve login JavaScript
app.get('/login/login.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/van-vat-corporation/login/login.js'));
});

// Serve complete-profile JavaScript
app.get('/complete-profile/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/van-vat-corporation/account/complete-profile/script.js'));
});

// API routes for account management
app.use('/api', accountRoutes);

// OAuth API routes (Google, Facebook, Apple)
app.use('/api/auth', oauthRoutes);

// Root redirect - check if user is authenticated, redirect accordingly
app.get('/', (req, res) => {
    // Check if user has auth cookie - if yes, redirect to account-center, else to login
    // For simplicity, always redirect to login for now (will be updated with proper auth check)
    res.redirect('/login');
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html')
    );
});

module.exports = app;
