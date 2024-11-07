// hotel-reservation-backend/routes/reservations.js
const express = require('express');
const pool = require('../config/db'); // Подключение к базе данных PostgreSQL через pool

const router = express.Router();

// Маршрут для получения всех бронирований
router.get('/', async (req, res) => {
    try {
        const reservations = await pool.query('SELECT * FROM reservations');
        res.json(reservations.rows);
    } catch (err) {
        console.error('Ошибка при получении бронирований:', err.message);
        res.status(500).send('Ошибка сервера');
    }
});

// Маршрут для создания нового бронирования
router.post('/', async (req, res) => {
    try {
        const { room_id, user_id, start_date, end_date } = req.body;
        const newReservation = await pool.query(
            'INSERT INTO reservations (room_id, user_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [room_id, user_id, start_date, end_date]
        );
        res.status(201).json(newReservation.rows[0]);
    } catch (err) {
        console.error('Ошибка при создании бронирования:', err.message);
        res.status(500).send('Ошибка сервера');
    }
});

// Маршрут для получения информации о конкретном бронировании по id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await pool.query('SELECT * FROM reservations WHERE id = $1', [id]);
        if (reservation.rows.length === 0) {
            return res.status(404).send('Бронирование не найдено');
        }
        res.json(reservation.rows[0]);
    } catch (err) {
        console.error('Ошибка при получении бронирования:', err.message);
        res.status(500).send('Ошибка сервера');
    }
});

// Маршрут для удаления бронирования по id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM reservations WHERE id = $1', [id]);
        res.send('Бронирование удалено');
    } catch (err) {
        console.error('Ошибка при удалении бронирования:', err.message);
        res.status(500).send('Ошибка сервера');
    }
});

// Добавьте этот маршрут в backend (например, в reservations.js)
router.post('/reservations', async (req, res) => {
    const { roomId, name, email, startDate, endDate } = req.body;
    try {
      const newReservation = await pool.query(
        'INSERT INTO reservations (room_id, name, email, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [roomId, name, email, startDate, endDate]
      );
      res.status(201).json(newReservation.rows[0]);
    } catch (error) {
      console.error('Ошибка при создании бронирования:', error.message);
      res.status(500).send('Ошибка сервера');
    }
  });

// В вашем сервере (например, server.js или reservations.js)
router.post('/reservations', async (req, res) => {
  const { room_id, name, email, start_date, end_date } = req.body;

  try {
    const newReservation = await pool.query(
      'INSERT INTO reservations (room_id, name, email, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [room_id, name, email, start_date, end_date]
    );
    res.status(201).json(newReservation.rows[0]);
  } catch (error) {
    console.error('Ошибка при создании бронирования:', error.message);
    res.status(500).send('Ошибка сервера');
  }
});


module.exports = router;

