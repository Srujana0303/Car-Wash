import API from './api';

export const signup =async (userData) => API.post('/signup', userData);
export const login = async(userData) => API.post('/login', userData);
