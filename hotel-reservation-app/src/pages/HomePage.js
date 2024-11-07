// src/pages/HomePage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function HomePage({ rooms }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reservationDetails, setReservationDetails] = useState({
    name: '',
    email: '',
    startDate: '',
    endDate: ''
  });

  const roomsPerPage = 3;
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setReservationDetails({ ...reservationDetails, [e.target.name]: e.target.value });
  };

  const handleReserve = async () => {
    try {
      await axios.post('http://localhost:5000/reservations', {
        roomId: selectedRoom.id,
        ...reservationDetails
      });
      alert('Reservation successful!');
      setShowModal(false);
      setReservationDetails({ name: '', email: '', startDate: '', endDate: '' });
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Available Rooms</h2>
      <div className="row">
        {currentRooms.map((room) => (
          <div key={room.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={room.image || "/images/default_room.jpg"}
                className="card-img-top"
                alt={room.name || "Room Image"}
                onError={(e) => e.target.src = "/images/default_room.jpg"}
              />
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">Price: {room.price ? `$${room.price}` : 'N/A'}</p>
                <button className="btn btn-primary" onClick={() => handleBookNow(room)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-secondary mx-2" onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="btn btn-secondary mx-2" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Модальное окно для формы резервирования */}
      {showModal && (
        <div className="modal show d-block" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reserve {selectedRoom.name}</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={reservationDetails.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={reservationDetails.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={reservationDetails.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={reservationDetails.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleReserve}>
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;








