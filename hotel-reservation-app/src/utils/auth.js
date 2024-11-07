import * as jwt_decode from 'jwt-decode';


export function getUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        return jwt_decode(token); // Декодируем токен
    } catch (error) {
        return null;
    }
}

export function isAuthenticated() {
    return !!getUser();
}

