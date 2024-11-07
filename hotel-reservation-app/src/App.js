// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CustomerPage from './pages/CustomerPage';
import ReceptionistPage from './pages/ReceptionistPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import ReservationsPage from './pages/ReservationsPage'; // Импортируем ReservationsPage
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const sampleRooms = [
    { id: 1, name: "Conference Room A", price: 100, image: "/images/conference_a.jpg" },
    { id: 2, name: "Meeting Room B", price: 75, image: "/images/meeting_b.jpg" },
    { id: 3, name: "Banquet Hall C", price: 150, image: "/images/banquet_c.jpg" },
    { id: 4, name: "Luxury Suite", price: 200, image: "/images/luxury_suite.jpg" },
    { id: 5, name: "Executive Suite", price: 250, image: "/images/executive_suite.jpg" },
    { id: 6, name: "Standard Room", price: 50, image: "/images/standard_room.jpg" },
    { id: 7, name: "Deluxe Room", price: 120, image: "/images/deluxe_room.jpg" },
    { id: 8, name: "Family Suite", price: 180, image: "/images/family_suite.jpg" },
    { id: 9, name: "Honeymoon Suite", price: 300, image: "/images/honeymoon_suite.jpg" },
    { id: 10, name: "Penthouse", price: 400, image: "/images/penthouse.jpg" },
  ];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${apiUrl}/rooms`);
        setRooms(response.data);
        setError(null);
      } catch (error) {
        console.error('Error loading rooms:', error);
        setRooms(sampleRooms); // Используем sampleRooms как fallback данные
        setError('Unable to load rooms. Showing sample data.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRooms();
  }, [apiUrl]); // Здесь только `apiUrl` в массиве зависимостей, чтобы избежать лишних перерендеров
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Hotel Reservation System</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reservations">Reservations</Link> {/* Ссылка на ReservationsPage */}
              </li>
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/customer">Customer</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/receptionist">Receptionist</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage rooms={rooms} />} />
          <Route path="/reservations" element={<ReservationsPage />} /> {/* Маршрут для ReservationsPage */}
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} roles={['admin']} />} />
          <Route path="/customer" element={<ProtectedRoute element={<CustomerPage rooms={rooms} />} roles={['customer']} />} />
          <Route path="/receptionist" element={<ProtectedRoute element={<ReceptionistPage />} roles={['receptionist']} />} />
        </Routes>

        <section className="container mt-5">
          {loading ? (
            <p>Loading rooms...</p>
          ) : error ? (
            <p>{error}</p>
          ) : rooms.length > 0 ? (
            <div className="row">
              {rooms.map((room, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card">
                    <img src={room.image || "/images/default_room.jpg"} className="card-img-top" alt={room.name} />
                    <div className="card-body">
                      <h5 className="card-title">{room.name}</h5>
                      <p className="card-text">Price: ${room.price !== undefined ? room.price : 'N/A'}</p>
                      <button className="btn btn-primary">Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No available rooms</p>
          )}
        </section>
      </div>
    </Router>
  );
}

export default App;





