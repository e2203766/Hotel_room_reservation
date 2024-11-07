// src/pages/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/signup`, { email, password, role });
      alert('Registration successful! Please sign in.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp} className="p-4 border rounded bg-light">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="receptionist">Receptionist</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
