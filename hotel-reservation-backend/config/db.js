require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PG_USER,       // PostgreSQL username
    host: process.env.PG_HOST,       // Host (usually localhost for local development)
    database: process.env.PG_DATABASE, // Database name
    password: process.env.PG_PASSWORD, // Password
    port: process.env.PG_PORT,       // PostgreSQL port
});

module.exports = pool;  // Экспортируем пул соединений

 
