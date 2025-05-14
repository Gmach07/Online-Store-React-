export const initialState = {
  usuario: {
    nombre: '',
    email: '',
    username: '',
    imagen: ''
  },
  isAuthenticated: false,
  loading: true,
  error: null,
  mensaje: null
};

const sesionUsuarioReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        usuario: action.payload.usuario,
        isAuthenticated: true,
        loading: false,
        error: null,
        mensaje: null
      };
    case 'LOGOUT':
      return {
        ...state,
        usuario: initialState.usuario,
        isAuthenticated: false,
        loading: false,
        error: null,
        mensaje: null
      };
    case 'CARGANDO':
      return {
        ...state,
        loading: true
      };
    case 'ACTUALIZAR':
      return {
        ...state,
        usuario: {
          ...state.usuario,
          ...action.payload.usuario
        },
        loading: false,
        error: null,
        mensaje: null
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case 'MENSAJE':
      return {
        ...state,
        mensaje: action.payload.mensaje
      };
    default:
      return state;
  }
}       
export default sesionUsuarioReducer;