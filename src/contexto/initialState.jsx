export const initialState = {
  // Estado de sesión de usuario (auth)
  usuario: {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    imagen: ''
  },
  isAuthenticated: false,
  loading: false,
  error: null,
  mensaje: null,
 sesionCarrito: {
    id: "",
    items: [],
  }
  // … aquí podrías añadir más slices (otro reducer) en el futuro
};
