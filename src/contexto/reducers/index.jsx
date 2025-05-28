import sesionUsuarioReducer from './sesionUsuarioReducer';
import { initialState } from '../initialState.jsx';
import sesionCarritoComprasReducer from './sesionCarritoCompraReducer.jsx';

export function mainReducer(state = initialState, action) {
  return {
    sesionUsuario: sesionUsuarioReducer(state.sesionUsuario, action),
    sesionCarrito: sesionCarritoComprasReducer(state.sesionCarrito, action),
  };
}