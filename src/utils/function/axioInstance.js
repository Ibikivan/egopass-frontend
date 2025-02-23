import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with custom config
const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

export default axiosInstance;