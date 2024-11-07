// src/pages/ReceptionistPage.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function ReceptionistPage() {
  const [reservations, setReservations] = useState([]);
  const [editReservationId, setEditReservationId] = useState(null);
  const [updatedStartDate, setUpdatedStartDate] = useState('');
  const [updatedEndDate, setUpdatedEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/reservations`);
      setReservations(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError('Failed to load reservations. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleUpdateReservation = async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/api/reservations/${id}`, {
        start_date: updatedStartDate,
        end_date: updatedEndDate,
      });
      setReservations(prevReservations =>
        prevReservations.map(reservation =>
          reservation.id === id ? response.data : reservation
        )
      );
      setEditReservationId(null);
      alert('Reservation updated successfully');
    } catch (err) {
      console.error('Error updating reservation:', err);
      alert('Failed to update reservation');
    }
  };

  return (
    <div>
      <h2>Reservation Management</h2>
      {loading ? (
        <p>Loading reservations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {reservations.map(reservation => (
            <li key={reservation.id}>
              <p>
                <strong>Reservation ID:</strong> {reservation.id} <br />
                <strong>Room ID:</strong> {reservation.room_id} <br />
                <strong>User ID:</strong> {reservation.user_id} <br />
                <strong>Start Date:</strong> {reservation.start_date} <br />
                <strong>End Date:</strong> {reservation.end_date}
              </p>
              {editReservationId === reservation.id ? (
                <div>
                  <label>
                    Start Date:
                    <input
                      type="date"
                      value={updatedStartDate}
                      onChange={(e) => setUpdatedStartDate(e.target.value)}
                    />
                  </label>
                  <label>
                    End Date:
                    <input
                      type="date"
                      value={updatedEndDate}
                      onChange={(e) => setUpdatedEndDate(e.target.value)}
                    />
                  </label>
                  <button onClick={() => handleUpdateReservation(reservation.id)}>Save</button>
                  <button onClick={() => setEditReservationId(null)}>Cancel</button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditReservationId(reservation.id);
                    setUpdatedStartDate(reservation.start_date);
                    setUpdatedEndDate(reservation.end_date);
                  }}
                >
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReceptionistPage;

