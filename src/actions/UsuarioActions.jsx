// Proyecto-Curso-React-/src/actions/UsuarioActions.js
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
      localStorage.setItem('token', data.token);
    } else {
      console.warn('[loginUsuario] no llegó token en la respuesta');
    }

    const usuario = data.usuario || data.user || data;

    console.log('[loginUsuario] usuario extraído =', usuario);

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

export async function actualizarPerfilUsuario(datos, dispatch) {
  dispatch({ type: 'CARGANDO' });
  try {
    const { data } = await HttpCliente.put(`/Usuario/actualizar/${datos.id}`, datos);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    const usuarioActualizado = data.usuario || data;

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
  dispatch({ type: 'LOGOUT' });
}

// Obtiene el usuario actualmente autenticado y lo despacha al store
export const getUsuario = async (dispatch) => { // Asegurado que acepta 'dispatch'
  try {
    const { data } = await HttpCliente.get('/Usuario');
    console.log('[getUsuario] data cruda =', data);

    let usuario = null;
    if (data.usuario) {
      usuario = data.usuario;
    } else if (data.user) {
      usuario = data.user;
    } else if (typeof data.username !== 'undefined' && data.id) {
      usuario = data;
    }

    if (usuario && dispatch) {
      dispatch({ type: 'LOGIN', payload: { usuario } });
    } else if (dispatch) {
      // Si no se encuentra usuario (pero no es un 401), asegúrate de que la sesión esté limpia
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    }
    return usuario;
  } catch (error) {
    if (error.response?.status === 401 && dispatch) {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
      return null;
    }
    console.error('Error en getUsuario:', error);
    throw error;
  }
};

export const getUsuarioById = async (id) => {
  try {
    const response = await HttpCliente.get(`/Usuario/account/${id}`);
    return response.data;
  } catch (error) {
    throw error.response || error;
  }
};

export const agregarRole = async (id, status) => {
  try {
    const response = await HttpCliente.put(`/Usuario/role/${id}`, {
      nombre: "Admin",     // 👈 este valor es obligatorio en el backend
      status: status       // 👈 debe ser booleano
    });
    return response.data;
  } catch (error) {
    console.error("Error en agregarRole:", error);
    throw error.response?.data || error;
  }
};

export const getUsuarios = (request) => {
  return new Promise((resolve, reject) => { // Se usa reject en lugar de resolver en el catch para manejar errores
    HttpCliente.get(`/Usuario/paginacion?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}`)
      .then(response => {
        // Si la petición es exitosa, se resuelve la promesa con los datos de la respuesta.
        resolve(response);
      })
      .catch(error => {
        // Si hay un error en la petición, se rechaza la promesa con el objeto de error.
        // Es común resolver con error.response si quieres manejar respuestas de error HTTP específicas.
        // Si quieres que el error se propague como una excepción, usa reject(error);
        console.error("Error al obtener usuarios:", error);
        reject(error.response || error); // Rechaza con la respuesta de error o el error completo
      });
  });
};