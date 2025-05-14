import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PublicRooms      from './PublicRooms';
import AdminRooms       from './AdminRooms';
import RoomForm         from './RoomForm';
import Login            from './Login';
import Reservations     from './Reservations';
import ReservationForm  from './ReservationForm';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/reservations" style={{ marginRight: 10 }}>My Reservations</Link>
        <Link to="/admin/rooms" style={{ marginRight: 10 }}>Admin: Manage Rooms</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Public listing */}
        <Route path="/" element={<PublicRooms />} />

        {/* Reservations UI */}
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/new" element={<ReservationForm />} />
        <Route path="/reservations/:id/edit" element={<ReservationForm />} />

        {/* Admin CRUD for rooms */}
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/rooms/new" element={<RoomForm />} />
        <Route path="/admin/rooms/:id/edit" element={<RoomForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
