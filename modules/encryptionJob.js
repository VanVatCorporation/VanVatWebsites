const crypto = require('crypto');

// Encryption and decryption key
const algorithm = 'aes-256-cbc'; // Advanced Encryption Standard (AES)
const key = crypto.randomBytes(32); // 32-byte key for AES-256
const iv = crypto.randomBytes(16); // Initialization vector (16 bytes)

function encryptingData(data) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex'); // Encrypt data
    encrypted += cipher.final('hex');
    return { encryptedData: encrypted, iv: iv.toString('hex') };
}

function decryptingData(encryptedData, ivHex) {
    const iv = Buffer.from(ivHex, 'hex'); // Convert IV back to buffer
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8'); // Decrypt data
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encryptingData, decryptingData, algorithm, key, iv };
