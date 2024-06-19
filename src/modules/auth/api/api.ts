import axios from 'axios';
const API = 'http://localhost:5000/v1/api';

export const authApi = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
