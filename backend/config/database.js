// backend/config/database.js
require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'performance_dashboard',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

// Promisify for async/await usage
const promisePool = pool.promise();

module.exports = promisePool;