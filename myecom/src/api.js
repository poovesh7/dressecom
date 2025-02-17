


import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

// Add Token to Request Headers
const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};


// Signup
export const signup = async (userData) => {
    return axios.post(`${API_URL}signup/`, userData);
};

// Login
export const login = async (credentials) => {
    return axios.post(`${API_URL}login/`, credentials);
};

