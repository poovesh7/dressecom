import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const signup = async (userData) => {
    return axios.post(`${API_URL}signup/`, userData);
};

export const login = async (credentials) => {
    return axios.post(`${API_URL}login/`, credentials);
};
