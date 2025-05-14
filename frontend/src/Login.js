import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // Request token from Django
      const { data } = await axios.post('/api/auth/token/', form);
      // Save token for future requests
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Token ${data.token}`;
      // Redirect to home or admin page
      navigate('/');
    } catch (err) {
      setError('Login failed: invalid username or password.');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>
            Username<br/>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>
            Password<br/>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <button type="submit" style={{ width: '100%' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}
