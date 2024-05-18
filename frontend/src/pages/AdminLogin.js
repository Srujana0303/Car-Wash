import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    try {
      const { data } = await axios.post('http://localhost:5000/api/admin/adminlogin', formData);
      console.log('Response Data:', data);
      localStorage.setItem('token', data.token);
      history('/admin-dashboard');
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
      }
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: '80vh' }}
    >
      <div className="row w-100">
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Admin Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder="Enter username"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
