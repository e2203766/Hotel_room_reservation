// routes/rooms.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Пример данных о комнатах (вы можете заменить на запрос к базе данных, если у вас есть база данных)
const rooms = [
  { id: 1, name: "Conference Room A", capacity: 50, available: true, price: 100, image: "/images/conference_a.jpg" },
  { id: 2, name: "Meeting Room B", capacity: 10, available: true, price: 75, image: "/images/meeting_b.jpg" },
  { id: 3, name: "Banquet Hall C", capacity: 100, available: false, price: 150, image: "/images/banquet_c.jpg" },
  { id: 4, name: "Luxury Suite", capacity: 5, available: true, price: 200, image: "/images/luxury_suite.jpg" },
  { id: 5, name: "Executive Suite", capacity: 4, available: true, price: 250, image: "/images/executive_suite.jpg" },
  { id: 6, name: "Standard Room", capacity: 2, available: true, price: 50, image: "/images/standard_room.jpg" },
  { id: 7, name: "Deluxe Room", capacity: 3, available: true, price: 120, image: "/images/deluxe_room.jpg" },
  { id: 8, name: "Family Suite", capacity: 6, available: true, price: 180, image: "/images/family_suite.jpg" },
  { id: 9, name: "Honeymoon Suite", capacity: 2, available: true, price: 300, image: "/images/honeymoon_suite.jpg" },
  { id: 10, name: "Penthouse", capacity: 8, available: true, price: 400, image: "/images/penthouse.jpg" },
];

// Маршрут для получения списка комнат
router.get('/', (req, res) => {
  try {
    res.json(rooms);
  } catch (error) {
    console.error('Ошибка при получении комнат:', error.message);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
