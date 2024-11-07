require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const pool = require('./config/db'); // Подключение к PostgreSQL через pool

const roomsRouter = require('./routes/rooms'); // Подключение маршрута для комнат
const reservationsRouter = require('./routes/reservations'); // Подключение маршрута для бронирований

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // Сервинг статических изображений

// Логирование запросов
app.use((req, res, next) => {
    console.log(`${req.method} запрос к ${req.url}`);
    next();
});

// Подключение маршрутов
app.use('/api/rooms', roomsRouter); // Все маршруты для /api/rooms будут обрабатываться в routes/rooms.js
app.use('/api/reservations', reservationsRouter); // Все маршруты для /api/reservations будут обрабатываться в routes/reservations.js

// Маршрут для регистрации нового пользователя
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
            [email, hashedPassword, role]
        );
        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
    } catch (err) {
        console.error('Ошибка при регистрации пользователя:', err.message);
        res.status(500).send('Ошибка сервера');
    }
});

// Маршрут для входа пользователя
app.post('/api/auth/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.rows[0].id, email: user.rows[0].email, role: user.rows[0].role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.json({ message: 'Logged in successfully', token });
    } catch (err) {
        console.error('Ошибка при входе пользователя:', err.message);
        res.status(500).send('Ошибка сервера');
    }
});

// Middleware для проверки токена
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Пример защищенного маршрута (только для аутентифицированных пользователей)
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Тестовый маршрут для проверки подключения к базе данных
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'Подключение к базе данных установлено', time: result.rows[0] });
    } catch (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
        res.status(500).send('Не удалось подключиться к базе данных');
    }
});

// Запуск сервера
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});


