import API from './api';

export const createBooking = (bookingData) => API.post('/bookings', bookingData);
export const getBookings = () => API.get('/bookings');
export const updateBookingStatus = (bookingId, status) => API.put('/bookings', { bookingId, status });
