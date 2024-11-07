import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({ room_id: '', name: '', email: '', start_date: '', end_date: '' });
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Получаем список бронирований
  useEffect(() => {
    const fetchReservations = async () => {
      console.log('Fetching reservations from:', `${apiUrl}/api/reservations`);
      try {
        const response = await axios.get(`${apiUrl}/api/reservations`);
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error.response?.data || error.message);
      }
    };
    fetchReservations();
  }, [apiUrl]);

  // Добавляем новое бронирование
  const handleAddReservation = async (e) => {
    e.preventDefault();
    console.log('Adding reservation:', newReservation);
    try {
      const response = await axios.post(`${apiUrl}/api/reservations`, {
        room_id: parseInt(newReservation.room_id, 10),
        name: newReservation.name,
        email: newReservation.email,
        start_date: newReservation.start_date,
        end_date: newReservation.end_date
      });
      console.log('Reservation added:', response.data);
      setReservations([...reservations, response.data]);
      setNewReservation({ room_id: '', name: '', email: '', start_date: '', end_date: '' });
    } catch (error) {
      console.error('Error adding reservation:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <h2>Reservations</h2>
      <ul>
        {reservations.map(res => (
          <li key={res.id}>
            Room ID: {res.room_id}, Name: {res.name}, Email: {res.email}, Dates: {res.start_date} - {res.end_date}
          </li>
        ))}
      </ul>

      {/* Форма для добавления нового бронирования */}
      <h3>Add a New Reservation</h3>
      <form onSubmit={handleAddReservation}>
        <div className="form-group">
          <label>Room ID</label>
          <input type="text" className="form-control" value={newReservation.room_id} onChange={(e) => setNewReservation({ ...newReservation, room_id: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={newReservation.name} onChange={(e) => setNewReservation({ ...newReservation, name: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={newReservation.email} onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" className="form-control" value={newReservation.start_date} onChange={(e) => setNewReservation({ ...newReservation, start_date: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" className="form-control" value={newReservation.end_date} onChange={(e) => setNewReservation({ ...newReservation, end_date: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Reservation</button>
      </form>
    </div>
  );
};

export default ReservationsPage;

