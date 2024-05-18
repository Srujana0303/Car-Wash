import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [places, setPlaces] = useState([]);
  const [shopName, setShopName] = useState('');
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState({ placeId: '', date: '' });

  const fetchPlaces = async () => {
    try {
      const { data } = await axios.get('/api/users/places');
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const addPlace = async () => {
    if (!shopName || !name || services.length === 0) {
      alert('Please fill in all fields and add at least one service.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/admin/place',
        { shopName, name, services },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShopName('');
      setName('');
      setServices([]);
      fetchPlaces();
    } catch (error) {
      console.error('Error adding place:', error.response.data.message);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
        params: filter,
      });
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        '/api/admin/booking/status',
        { bookingId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Add Place</h3>
              <div className="mb-3">
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="form-control"
                  placeholder="Shop Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Place Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="form-control"
                  placeholder="Service"
                  required
                />
              </div>
              <div className="mb-3">
                <button
                  onClick={() => {
                    if (service) {
                      setServices([...services, service]);
                      setService('');
                    }
                  }}
                  className="btn btn-primary"
                >
                  Add Service
                </button>
              </div>
              <ul className="list-group mb-3">
                {services.map((serv, index) => (
                  <li key={index} className="list-group-item">{serv}</li>
                ))}
              </ul>
              <button onClick={addPlace} className="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Bookings</h3>
              <select onChange={(e) => setFilter({ ...filter, placeId: e.target.value })} className="form-select mb-3">
                <option value="">All Places</option>
                {places.map((place) => (
                  <option key={place._id} value={place._id}>
                    {place.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                className="form-control mb-3"
              />
              <button onClick={fetchBookings} className="btn btn-primary mb-3">Filter</button>
              <ul className="list-group">
                {bookings.length === 0 ? (
                  <li className="list-group-item">No bookings</li>
                ) : (
                  bookings.map((booking) => (
                    <li key={booking._id} className="list-group-item">
                      {booking.shopName} - {booking.place?.name} - {booking.user.name} - {booking.service} -{' '}
                      {booking.date.split('T')[0]} - {booking.status}
                      {booking.status === 'pending' && (
                        <>
                          <button onClick={() => updateBookingStatus(booking._id, 'accepted')} className="btn btn-success me-2">
                            Accept
                          </button>
                          <button onClick={() => updateBookingStatus(booking._id, 'rejected')} className="btn btn-danger">
                            Reject
                          </button>
                        </>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
