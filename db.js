const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',       // PostgreSQL username (default: postgres)
    host: 'localhost',          // Host (for local development, this is localhost)
    database: 'hotel_reservation_db',  // Database you created earlier
    password: 'Cherry^1919',   // Password you set during PostgreSQL installation
    port: 5432,                 // Default PostgreSQL port
});

module.exports = pool;  // Export the connection pool
 
