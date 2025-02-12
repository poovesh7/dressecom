import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const signup = async (userData) => {
    return axios.post(`${API_URL}signup/`, userData);
};

export const login = async (credentials) => {
    return axios.post(`${API_URL}login/`, credentials);
};


// export const getUsers = async (userIds ) => {
//     const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5MzIyMzU0LCJpYXQiOjE3MzkzMjIwNTQsImp0aSI6ImRkZWM5MTdkNzliZjRlMDM4MGI1ZDEwYjNmYTE5NDRjIiwidXNlcl9pZCI6MX0.bQdsSarqo-pUkpcW4Z6S76-4fWM7iX3GwM_jzGRlf40"
//     return axios.get(`${API_URL}get-users/`, {     params: { ids:1 }, headers: {
//         Authorization: `Bearer ${token}` // Include JWT token for authentication
//     } // Pass IDs as query parameters
//         });
// };