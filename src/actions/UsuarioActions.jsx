// src/actions/UsuarioActions.js
import HttpCliente from '../servicios/HttpCliente';

// Registra un nuevo usuario
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
  dispatch({ type: 'CARGANDO' });
  try {
    const { data } = await HttpCliente.post('/Usuario/login', credentials);

    // 1) Loguea la respuesta para ver su forma
    console.log('[loginUsuario] data cruda =', data);

    // 2) Guarda el token (si viene en data.token o similar)
    if (data.token) {
      localStorage.setItem('token', data.token);
    } else {
      console.warn('[loginUsuario] no llegó token en la respuesta');
    }

    // 3) Extrae el objeto usuario real
    //    Ajusta aquí si tu API lo devuelve en data.usuario, data.user, data.result.usuario, etc.
    const usuario = data.usuario || data.user || data;  
    console.log('[loginUsuario] usuario extraído =', usuario);

    // 4) Despacha
    dispatch({ type: 'LOGIN', payload: { usuario } });
    return usuario;
  } catch (error) {
    const mensajeError =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Error desconocido';
    dispatch({ type: 'ERROR', payload: { error: mensajeError } });
    throw mensajeError;
  }
}

// Action creator de logout
export function logoutUsuario(dispatch) {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
}

// Obtiene el usuario actualmente autenticado
export const getUsuario = async () => {
  try {
    const { data } = await HttpCliente.get('/Usuario');
    console.log('[getUsuario] data cruda =', data);

    // Ajusta aquí según la forma real de tu API
    if (data.usuario)       return data.usuario;
    if (data.user)          return data.user;
    if (typeof data.username !== 'undefined') return data;
    return null;
  } catch (error) {
    if (error.response?.status === 401) return null;
    throw error;
  }
};
