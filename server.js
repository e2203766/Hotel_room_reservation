const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import the pool to connect to PostgreSQL

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // This line enables JSON parsing

// POST route to add a new room
app.post('/rooms', async (req, res) => {
    try {
        const { name, capacity, available } = req.body;
        const newRoom = await pool.query(
            'INSERT INTO rooms (name, capacity, available) VALUES ($1, $2, $3) RETURNING *',
            [name, capacity, available]
        );
        res.json(newRoom.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET route to get all rooms
app.get('/rooms', async (req, res) => {
    try {
        const rooms = await pool.query('SELECT * FROM rooms');
        res.json(rooms.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');  // Executes a simple SQL query to get current timestamp
        res.json(result.rows);
    } catch (err) {
        console.error('Database connection error:', err.message);  // Logs any connection error
        res.status(500).send('Database Connection Failed');
    }
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



