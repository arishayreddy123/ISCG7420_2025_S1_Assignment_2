import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    username:'', password:'', first_name:'', last_name:'', email:''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/auth/register/', form);
      // on successful register, redirect to login
      navigate('/login');
    } catch (err) {
      setError('Registration failed: ' + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div style={{ padding:20, maxWidth:400, margin:'0 auto' }}>
      <h1>Register</h1>
      {error && <p style={{ color:'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {['username','password','first_name','last_name','email'].map(field => (
          <div key={field} style={{ marginBottom:10 }}>
            <label>
              {field.replace('_',' ').toUpperCase()}<br/>
              <input
                name={field}
                type={field==='password'?'password':'text'}
                value={form[field]}
                onChange={handleChange}
                required
                style={{ width:'100%' }}
              />
            </label>
          </div>
        ))}
        <button type="submit" style={{ width:'100%' }}>Sign Up</button>
      </form>
    </div>
  );
}
