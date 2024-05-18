// frontend/src/App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login.js';
import AdminLogin from './pages/AdminLogin.js';
import UserDashboard from './pages/userDashboard';
import AdminDashboard from './pages/AdminDashboard.js';

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
