// src/servicios/HttpCliente.js
import axios from 'axios';

// En Vite, las env variables vienen de import.meta.env con prefijo VITE_
const HttpCliente = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de petición: se registra sobre la instancia HttpCliente
HttpCliente.interceptors.request.use(
  (config) => {
    // Agregar el token de autorización a la cabecera de la solicitud
    const token = localStorage.getItem('token');
    console.log('👉 Interceptor token:', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('👉 Interceptor token:', token);
    }
    return config;
  },
  (error) => {
    // Manejo de errores de la solicitud
    return Promise.reject(error);
  }
);

export default HttpCliente;
