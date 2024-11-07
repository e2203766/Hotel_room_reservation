import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function CustomerPage() {
  const [rooms, setRooms] = useState([]);

  // Оберните fetchRooms в useCallback
  const fetchRooms = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке комнат:", error);
    }
  }, []); // Зависимости пустые, так как функция не зависит от пропсов или состояния

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]); // Теперь fetchRooms можно безопасно добавить в зависимости

  const reserveRoom = async (roomId) => {
    try {
      await axios.post('http://localhost:5000/api/reservations', { roomId });
      alert('Комната успешно забронирована!');
    } catch (error) {
      console.error("Ошибка при бронировании комнаты:", error);
      alert('Не удалось забронировать комнату. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div>
      <h2>Доступные комнаты</h2>
      <p>Просмотрите доступные комнаты и забронируйте подходящую.</p>
      {rooms && rooms.length > 0 ? (
        <ul>
          {rooms.map(room => (
            <li key={room._id}>
              {room.name} - ${room.price}
              <button onClick={() => reserveRoom(room._id)}>Забронировать</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет доступных комнат</p>
      )}
    </div>
  );
}

export default CustomerPage;


