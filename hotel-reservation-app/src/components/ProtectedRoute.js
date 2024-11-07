// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

function ProtectedRoute({ element, roles }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/signin" />; // Перенаправление на страницу входа, если пользователь не авторизован
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />; // Перенаправление на главную страницу, если роль пользователя не подходит
  }

  return element;
}

export default ProtectedRoute;
