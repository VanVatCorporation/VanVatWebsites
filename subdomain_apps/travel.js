const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
const app = express();

app.use('/camping', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-camping')));
app.use('/camping/camp-site', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-camping/camp-site')));
app.use('/camping/camp-stay', express.static(path.join(__dirname, '../public/van-vat-corporation/van-vat-camping/camp-stay')));

// Simple in-memory order storage
const orders = new Map();

app.use(express.json());

// API: Create Order
app.post('/camping/api/create-order', (req, res) => {
    const { amount, info } = req.body;
    const orderId = `VV${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // In a real app, you'd store this in a database
    orders.set(orderId, {
        status: 'pending',
        amount: amount,
        info: info,
        createdAt: new Date()
    });

    res.json({ orderId: orderId });
});

// API: Check Order Status
app.get('/camping/api/order-status/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const order = orders.get(orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ status: order.status });
});

// API: SePay Webhook
app.post('/camping/api/sepay-webhook', (req, res) => {
    const payload = req.body;

    // Log the payload for debugging
    logging.consoleLog(`SePay Webhook received: ${JSON.stringify(payload)}`);

    // Extract transaction content (e.g., VV123456789)
    const content = payload.content || "";
    const amount = payload.transferAmount || 0;

    // Search for a matching order based on the transaction content
    // SePay usually sends the content of the transfer, which contains our orderId
    for (const [orderId, order] of orders.entries()) {
        if (content.includes(orderId)) {
            // Verify amount if needed (optional for simplicity now)
            order.status = 'completed';
            logging.consoleLog(`Order ${orderId} marked as completed via SePay`);
            break;
        }
    }

    res.json({ success: true });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;