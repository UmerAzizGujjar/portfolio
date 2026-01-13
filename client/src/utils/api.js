import axios from 'axios';

// Use Railway backend URL or fallback to local
const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-production-a066.up.railway.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
