import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDashboard = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data } = await axios.get('http://localhost:5000/api/users/places');
      setPlaces(data);
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    if (selectedPlace) {
      const place = places.find((p) => p._id === selectedPlace);
      setShops(place.shops);
    }
  }, [selectedPlace, places]);

  useEffect(() => {
    if (selectedShop) {
      const shop = shops.find((s) => s._id === selectedShop);
      setServices(shop.services);
    }
  }, [selectedShop, shops]);

  const handleBook = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/users/book',
        { placeId: selectedPlace, shopId: selectedShop, service: selectedService, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('http://localhost:5000/api/users/status', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h1 className="text-center my-5">Car Wash Booking</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-4 mb-4 shadow-sm">
              <h2 className="card-title text-center mb-4">Book a Car Wash</h2>
              <div className="mb-3">
                <label htmlFor="placeSelect" className="form-label">Select a Place</label>
                <select id="placeSelect" className="form-select" onChange={(e) => setSelectedPlace(e.target.value)}>
                  <option value="">Select a place</option>
                  {places.map((place) => (
                    <option key={place._id} value={place._id}>
                      {place.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedPlace && (
                <>
                  <div className="mb-3">
                    <label htmlFor="shopSelect" className="form-label">Select a Shop</label>
                    <select id="shopSelect" className="form-select" onChange={(e) => setSelectedShop(e.target.value)}>
                      <option value="">Select a shop</option>
                      {shops.map((shop) => (
                        <option key={shop._id} value={shop._id}>
                          {shop.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedShop && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="serviceSelect" className="form-label">Select a Service</label>
                        <select id="serviceSelect" className="form-select" onChange={(e) => setSelectedService(e.target.value)}>
                          <option value="">Select a service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="dateInput" className="form-label">Select a Date</label>
                        <input
                          id="dateInput"
                          type="date"
                          className="form-control"
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <button onClick={handleBook} className="btn btn-primary w-100">Book</button>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="card p-4 shadow-sm">
              <h3 className="card-title text-center mb-4">Your Bookings</h3>
              <ul className="list-group">
                {bookings.map((booking) => (
                  <li key={booking._id} className="list-group-item">
                    {booking.place.name} - {booking.service} - {booking.date.split('T')[0]} - {booking.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
