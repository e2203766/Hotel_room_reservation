// hotel-reservation-backend/models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  date: { type: Date, default: Date.now },
  // Другие поля, например, пользователь, статус и т.д.
});

module.exports = mongoose.model('Reservation', reservationSchema);
