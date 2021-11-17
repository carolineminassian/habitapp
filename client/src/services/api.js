import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3010',
  // baseURL: process.env.REACT_APP_API_URL, // in .env file: REACT_APP_API_URL=https:://ironhack-habitapp.herokuapp.com
  withCredentials: true
});

export default api;
