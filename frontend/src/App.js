import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import PublicRooms      from './PublicRooms';
import Reservations     from './Reservations';
import ReservationForm  from './ReservationForm';

import AdminRooms       from './AdminRooms';
import RoomForm         from './RoomForm';
import AdminUsers       from './AdminUsers';
import UserForm         from './UserForm';

import Login            from './Login';
import Register         from './Register';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
        <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
        <Link to="/reservations" style={{ marginRight: 10 }}>My Reservations</Link>
        <Link to="/admin/rooms" style={{ marginRight: 10 }}>Admin Rooms</Link>
        <Link to="/admin/users">Admin Users</Link>
      </nav>

      <Routes>
        {/* Public & auth */}
        <Route path="/" element={<PublicRooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Reservations UI */}
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/new" element={<ReservationForm />} />
        <Route path="/reservations/:id/edit" element={<ReservationForm />} />

        {/* Admin Rooms CRUD */}
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/rooms/new" element={<RoomForm />} />
        <Route path="/admin/rooms/:id/edit" element={<RoomForm />} />

        {/* Admin Users CRUD */}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/new" element={<UserForm />} />
        <Route path="/admin/users/:id/edit" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
