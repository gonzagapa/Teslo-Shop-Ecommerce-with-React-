import axios from 'axios';

export const apiTeslo = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//TODO: interceptores