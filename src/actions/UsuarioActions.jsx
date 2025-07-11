// src/actions/UsuarioActions.js
import HttpCliente from '../servicios/HttpCliente';

// Registra un nuevo usuario
export async function registrarUsuario(usuarioData, dispatch) {
  if (dispatch) {
    dispatch({ type: 'CARGANDO' });
  }

  try {
    const { data } = await HttpCliente.post('/Usuario/registrar', usuarioData);

    console.log('[registrarUsuario] data cruda =', data);

    if (data.token) {
      localStorage.setItem('token', data.token);
    } else {
      console.warn('[registrarUsuario] no llegó token en la respuesta');
    }

    const usuarioPayload = {
      id: data.id,
      email: data.email,
      username: data.username,
      nombre: data.nombre,
      apellido: data.apellido,
      imagen: data.imagen || '',
      admin: data.admin || false,
    };

    // NO GUARDAR EL OBJETO USUARIO COMPLETO EN LOCALSTORAGE DIRECTAMENTE.
    // El token es suficiente para la persistencia, y getUsuario debe traer los datos frescos.
    // localStorage.setItem('usuario', JSON.stringify(usuarioPayload)); // <-- ELIMINADO

    if (dispatch) {
      dispatch({
        type: 'LOGIN',
        payload: { usuario: usuarioPayload },
      });
    }

    return data;
  } catch (error) {
    const mensajeError =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Error desconocido';
    if (dispatch) {
      dispatch({ type: 'ERROR', payload: { error: mensajeError } });
    }
    throw mensajeError;
  }
}

// Action creator de login
export async function loginUsuario(credentials, dispatch) {
  dispatch({ type: 'CARGANDO' });
  try {
    const { data } = await HttpCliente.post('/Usuario/login', credentials);

    console.log('[loginUsuario] data cruda =', data);

    if (data.token) {
      // ✅ AQUÍ GUARDA el token
      localStorage.setItem('token', data.token);
    } else {
      console.warn('[loginUsuario] no llegó token en la respuesta');
    }

    // ✅ AQUÍ extrae el usuario (ajusta según tu API)
    const usuario = data.usuario || data.user || data;

    console.log('[loginUsuario] usuario extraído =', usuario);

    // NO GUARDAR EL OBJETO USUARIO COMPLETO EN LOCALSTORAGE DIRECTAMENTE.
    // El token es suficiente para la persistencia, y getUsuario debe traer los datos frescos.
    // localStorage.setItem('usuario', JSON.stringify(usuario)); // <-- ELIMINADO

    // Despacha al reducer/contexto
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

// src/actions/UsuarioActions.js
export async function actualizarPerfilUsuario(datos, dispatch) {
  dispatch({ type: 'CARGANDO' });
  try {
    const { data } = await HttpCliente.put(`/Usuario/actualizar/${datos.id}`, datos);

    // Si tu API devuelve un nuevo token al actualizar (no es común, pero si lo hace, guárdalo)
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // El usuario actualizado debería venir en la respuesta
    const usuarioActualizado = data.usuario || data;

    // Despacha la acción LOGIN con el usuario actualizado para reflejar los cambios en el estado global
    dispatch({
      type: 'LOGIN',
      payload: { usuario: usuarioActualizado }
    });

    return usuarioActualizado;
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
  // También limpia el usuario de localStorage si se estaba guardando (aunque ya lo eliminamos arriba)
  localStorage.removeItem('usuario');
  dispatch({ type: 'LOGOUT' });
}

// Obtiene el usuario actualmente autenticado y lo despacha al store
export const getUsuario = async (dispatch) => { // AHORA ACEPTA 'dispatch'
  try {
    const { data } = await HttpCliente.get('/Usuario');
    console.log('[getUsuario] data cruda =', data);

    let usuario = null;
    if (data.usuario) {
      usuario = data.usuario;
    } else if (data.user) {
      usuario = data.user;
    } else if (typeof data.username !== 'undefined' && data.id) { // Asegurarse de que sea un objeto usuario válido
      usuario = data;
    }

    if (usuario && dispatch) {
      // Si se encuentra un usuario válido, despacha la acción LOGIN
      dispatch({ type: 'LOGIN', payload: { usuario } });
    } else if (dispatch) {
      // Si no se encuentra usuario (pero no es un 401), asegúrate de que la sesión esté limpia
      localStorage.removeItem('token');
      localStorage.removeItem('usuario'); // Por si acaso
      dispatch({ type: 'LOGOUT' });
    }
    return usuario;
  } catch (error) {
    // Si la API devuelve un 401 (No autorizado), limpia el token y despacha LOGOUT
    if (error.response?.status === 401 && dispatch) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario'); // Por si acaso
      dispatch({ type: 'LOGOUT' });
      return null; // Devuelve null para indicar que no hay usuario
    }
    console.error('Error en getUsuario:', error);
    throw error; // Relanza el error para que pueda ser manejado por el llamador si es necesario
  }
};