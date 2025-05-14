import React, { useState, useEffect } from 'react';
import { useParams, useNavigate }  from 'react-router-dom';
import axios from 'axios';

export default function ReservationForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    room: '',
    start_time: '',
    end_time: ''
  });

  // Load rooms for selection
  useEffect(() => {
    axios.get('/rooms/')
      .then(res => setRooms(res.data))
      .catch(err => alert('Error loading rooms: ' + err.message));
  }, []);

  // If editing, load existing reservation
  useEffect(() => {
    if (isEdit) {
      axios.get(`/reservations/${id}/`)
        .then(res => {
          // convert ISO to input-friendly format: YYYY-MM-DDTHH:MM
          const toInput = dt => dt.slice(0,16);
          setForm({
            room: res.data.room,
            start_time: toInput(res.data.start_time),
            end_time: toInput(res.data.end_time)
          });
        })
        .catch(err => alert('Error loading reservation: ' + err.message));
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // convert back to full ISO with Z
    const payload = {
      room: form.room,
      start_time: form.start_time + ':00Z',
      end_time:   form.end_time   + ':00Z'
    };

    const req = isEdit
      ? axios.put(`/reservations/${id}/`, payload)
      : axios.post('/reservations/', payload);

    req
      .then(() => navigate('/reservations'))
      .catch(err => alert('Save failed: ' + JSON.stringify(err.response?.data || err.message)));
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
      <h1>{isEdit ? 'Edit' : 'New'} Reservation</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>
            Room<br/>
            <select
              name="room"
              value={form.room}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            >
              <option value="">— Select Room —</option>
              {rooms.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name} (cap: {r.capacity})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Start<br/>
            <input
              name="start_time"
              type="datetime-local"
              value={form.start_time}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            End<br/>
            <input
              name="end_time"
              type="datetime-local"
              value={form.end_time}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <button type="submit" style={{ width: '100%' }}>
          {isEdit ? 'Save Reservation' : 'Create Reservation'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/reservations')}
          style={{ marginTop: 10, width: '100%' }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
