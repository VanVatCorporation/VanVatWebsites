const fs = require('fs');
const path = require('path');

//const logFilePath = path.join(__dirname, 'logs', getLogFileName()); // timestamp locked when script starts
const logFilePath = path.join('data/logs', getLogFileName()); // timestamp locked when script starts

//const logsDir = path.join(__dirname, 'logs');
const logsDir = path.join('data/logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

function writeToLogFile(level, message, ...info) {

    const logDetails = info.length ? ` | Details: ${info.map(e => e.toString()).join(', ')}` : '';
    const timestamp = getFormattedTimestampNow();
    const output = `[${timestamp}] [${level.toUpperCase()}] ${message}${logDetails}\n`;

    // Write to file
    fs.appendFileSync(logFilePath, output, 'utf8');

    // Print to console
    if (level === 'log') console.log(output.trim());
    else if (level === 'warn') console.warn(output.trim());
    else if (level === 'error') console.error(output.trim());
}



function consoleLog(message, ...info) {
    writeToLogFile('log', message, info);
}
function consoleWarning(message, ...warn) {
    writeToLogFile('warn', message, warn);
}
function consoleError(message, ...errors) {
    writeToLogFile('error', message, errors);
}

//function getFormattedTimestampNow() {
//    const now = new Date();
//    const pad = num => num.toString().padStart(2, '0');

//    const day = pad(now.getDate());
//    const month = pad(now.getMonth() + 1); // Months are zero-based
//    const year = now.getFullYear();
//    const hours = pad(now.getHours());
//    const minutes = pad(now.getMinutes());
//    const seconds = pad(now.getSeconds());

//    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
//}

function getFormattedTimestampNow() {
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
function getLogFileName() {
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    return `log-${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}-${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}.txt`;
}




module.exports = { consoleLog, consoleWarning, consoleError };
