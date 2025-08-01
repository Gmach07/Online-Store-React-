import { initialState } from '../initialState.jsx';

export default function sesionUsuarioReducer(state = initialState, action) {
  switch (action.type) {
    case 'CARGANDO':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'LOGIN':
    case 'LOGIN_SUCCESS':  // Alias para mismas acciones
      return {
        ...state,
        usuario: action.payload.usuario,
        isAuthenticated: true,
        loading: false,
        error: null,
        mensaje: null,
      };


    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
      };

    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case 'MENSAJE':
      return {
        ...state,
        mensaje: action.payload.mensaje,
      };

    default:
      return state;
  }
}
