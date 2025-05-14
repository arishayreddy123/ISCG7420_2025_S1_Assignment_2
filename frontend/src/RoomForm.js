import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RoomForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    capacity: '',
    description: ''
  });

  // Load existing room if editing
  useEffect(() => {
    if (isEdit) {
      axios.get(`/api/rooms/${id}/`)
        .then(res => setForm(res.data))
        .catch(err => alert('Error loading room: ' + err.message));
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const req = isEdit
      ? axios.put(`/api/rooms/${id}/`, form)
      : axios.post('/api/rooms/', form);

    req
      .then(() => navigate('/admin/rooms'))
      .catch(err => alert('Save failed: ' + JSON.stringify(err.response?.data || err.message)));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{isEdit ? 'Edit' : 'New'} Room</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>
            Name<br/>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Capacity<br/>
            <input
              name="capacity"
              type="number"
              value={form.capacity}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Description<br/>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <button type="submit">
          {isEdit ? 'Save Changes' : 'Create Room'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/rooms')}
          style={{ marginLeft: 8 }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
