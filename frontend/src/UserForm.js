import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username:'', first_name:'', last_name:'', email:'', is_staff:false, password:''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      axios.get(`/api/users/${id}/`)
        .then(res => setForm({ ...res.data, password:'' }))
        .catch(err => alert('Error loading user: ' + err.message));
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type==='checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    const payload = {
      username: form.username,
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      is_staff: form.is_staff,
      ...(form.password ? { password: form.password } : {})
    };

    const req = isEdit
      ? axios.put(`/api/users/${id}/`, payload)
      : axios.post('/api/users/', payload);

    req.then(() => navigate('/admin/users'))
       .catch(err => setError(JSON.stringify(err.response?.data)));
  };

  return (
    <div style={{ padding:20, maxWidth:400, margin:'0 auto' }}>
      <h1>{isEdit? 'Edit':'New'} User</h1>
      {error && <p style={{ color:'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {['username','first_name','last_name','email','password'].map(fld => (
          <div key={fld} style={{ marginBottom:10 }}>
            <label>
              {fld.replace('_',' ').toUpperCase()}<br/>
              <input
                name={fld}
                type={fld==='password'?'password':'text'}
                value={form[fld]}
                onChange={handleChange}
                required={fld==='username'}
                style={{ width:'100%' }}
              />
            </label>
          </div>
        ))}
        <div style={{ marginBottom:10 }}>
          <label>
            <input
              name="is_staff"
              type="checkbox"
              checked={form.is_staff}
              onChange={handleChange}
            /> Staff user
          </label>
        </div>
        <button type="submit" style={{ width:'100%' }}>
          {isEdit? 'Save User':'Create User'}
        </button>
        <button type="button" onClick={() => navigate('/admin/users')} style={{ marginTop:8, width:'100%' }}>
          Cancel
        </button>
      </form>
    </div>
  );
}
