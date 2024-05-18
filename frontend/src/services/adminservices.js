import API from './api';

export const addPlace = (place) => API.post('/admin/places', { name: place });
export const addService = (service, placeId) => API.post('/admin/services', { name: service, placeId });
export const viewBookings = (place, date) => API.get('/admin/bookings', { params: { place, date } });
