import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [rooms, setRooms] = useState([]); // useState hook to manage room data

    // useEffect hook to fetch room data from backend
    useEffect(() => {
        axios.get('http://localhost:5000/rooms')
            .then(response => setRooms(response.data)) // set the fetched rooms data to state
            .catch(error => console.log(error)); // log any errors to the console
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div className="App">
            <h1>Hotel Reservation System</h1>
            <ul>
                {rooms.map(room => (
                    <li key={room.id}>{room.name}</li> // Display the room names in an unordered list
                ))}
            </ul>
        </div>
    );
}

export default App;


