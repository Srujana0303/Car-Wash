import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const history = useNavigate();

  useEffect(() => {
    document.title = 'Car Wash Booking - Signup';
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/signup', formData);
      history('/login');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-center my-5">Car Wash Booking</h1>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Signup</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Name" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Signup</button>
                </form>
                <p className="mt-3 text-center">
                  Already have an account? <a href="/login">Login</a><br />
                  Here as an admin? <a href="/adminlogin">Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
