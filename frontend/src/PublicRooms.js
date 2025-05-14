import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PublicRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('/api/rooms/')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Available Rooms</h1>
      {rooms.length === 0
        ? <p>No rooms available.</p>
        : (
          <ul>
            {rooms.map(r => (
              <li key={r.id}>
                <strong>{r.name}</strong> (cap: {r.capacity}) – {r.description}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
}
