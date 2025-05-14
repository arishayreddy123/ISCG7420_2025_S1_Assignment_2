import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // Fetch rooms (requires staff token header already set)
  const fetchRooms = () => {
    axios.get('/api/rooms/')
      .then(res => setRooms(res.data))
      .catch(err => alert('Error fetching rooms: ' + err.message));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = id => {
    if (!window.confirm('Delete this room?')) return;
    axios.delete(`/api/rooms/${id}/`)
      .then(fetchRooms)
      .catch(err => alert('Delete failed: ' + JSON.stringify(err.response?.data || err.message)));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin: Manage Rooms</h1>
      <button onClick={() => navigate('/admin/rooms/new')}>
        + New Room
      </button>

      {rooms.length === 0
        ? <p>No rooms defined yet.</p>
        : (
          <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 10 }}>
            <thead style={{ background: '#f0f0f0' }}>
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(r => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.capacity}</td>
                  <td>{r.description}</td>
                  <td>
                    <button onClick={() => navigate(`/admin/rooms/${r.id}/edit`)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(r.id)} style={{ marginLeft: 8 }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
}
