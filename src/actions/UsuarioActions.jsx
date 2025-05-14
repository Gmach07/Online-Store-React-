// src/actions/UsuarioActions.js
import { Http } from '@mui/icons-material';
import HttpCliente from '../servicios/HttpCliente';
import axios from 'axios';

const instancia =  axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
instancia.cancelToken = () => {
  delete instancia.defaults.headers.common['Authorization'];
};  

export async function registrarUsuario(usuario) {
  try {
    const { data } = await HttpCliente.post('/Usuario/registrar', usuario);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// Action creator de login
export async function loginUsuario(credentials, dispatch) {
  // Indicamos que estamos cargando
  dispatch({ type: 'CARGANDO' });

  try {
    const { data } = await HttpCliente.post('/Usuario/login', credentials);
    // Asumimos que en `data.usuario` viene el objeto usuario que necesita el reducer
    dispatch({
      type: 'LOGIN',
      payload: {
        usuario: data.usuario
      }
    });
    return data;
  } catch (error) {
    // Extraemos mensaje de error (puede venir en response.data o fallback)
    const mensajeError =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Error desconocido';

    dispatch({
      type: 'ERROR',
      payload: {
        error: mensajeError
      }
    });

    // Opcional: si tu UI lo maneja, puedes relanzar el error
    throw mensajeError;
  }
}

// (Opcional) Action creator de logout
export function logoutUsuario(dispatch) {
  // Aquí no hay llamada a API, simplemente limpiamos estado
  dispatch({ type: 'LOGOUT' });
}

export const getUsuario = () => {
  return new Promise ((resolve, reject) => {
    HttpCliente.get('/Usuario').then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    })
  })
}
