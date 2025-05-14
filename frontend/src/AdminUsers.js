import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = () => {
    axios.get('/api/users/')
      .then(res => setUsers(res.data))
      .catch(err => alert('Error fetching users: ' + err.message));
  };

  useEffect(fetchUsers, []);

  const handleDelete = id => {
    if (!window.confirm('Delete this user?')) return;
    axios.delete(`/api/users/${id}/`)
      .then(fetchUsers)
      .catch(err => alert('Delete failed: ' + err.message));
  };

  return (
    <div style={{ padding:20 }}>
      <h1>Admin: Manage Users</h1>
      <button onClick={() => navigate('/admin/users/new')}>
        + New User
      </button>
      <table border="1" cellPadding="8" style={{ marginTop:10, width:'100%' }}>
        <thead style={{ background:'#f0f0f0' }}>
          <tr>
            <th>Username</th><th>Name</th><th>Email</th><th>Staff?</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.first_name} {u.last_name}</td>
              <td>{u.email}</td>
              <td>{u.is_staff ? 'Yes':'No'}</td>
              <td>
                <button onClick={() => navigate(`/admin/users/${u.id}/edit`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(u.id)} style={{ marginLeft:8 }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
