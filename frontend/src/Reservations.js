import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const fetchReservations = () => {
    axios.get('/reservations/')
      .then(res => setReservations(res.data))
      .catch(err => alert('Error loading reservations: ' + err.message));
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = id => {
    if (!window.confirm('Cancel this reservation?')) return;
    axios.delete(`/reservations/${id}/`)
      .then(fetchReservations)
      .catch(err => alert('Delete failed: ' + JSON.stringify(err.response?.data || err.message)));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Reservations</h1>
      <button onClick={() => navigate('/reservations/new')}>
        + New Reservation
      </button>

      {reservations.length === 0
        ? <p>You have no reservations.</p>
        : (
          <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 10 }}>
            <thead style={{ background: '#f0f0f0' }}>
              <tr>
                <th>Room</th>
                <th>Start</th>
                <th>End</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r.id}>
                  <td>{r.room_name || r.room}</td>
                  <td>{new Date(r.start_time).toLocaleString()}</td>
                  <td>{new Date(r.end_time).toLocaleString()}</td>
                  <td>
                    <button onClick={() => navigate(`/reservations/${r.id}/edit`)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(r.id)} style={{ marginLeft: 8 }}>
                      Cancel
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
