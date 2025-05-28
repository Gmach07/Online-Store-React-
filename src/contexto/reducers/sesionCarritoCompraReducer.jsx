// ✅ src/reducers/sesionCarritoComprasReducer.jsx

export const initialState = {
  id: "",
  items: []
};

const sesionCarritoComprasReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CARRITO_SESION":
      return {
        ...state,
        id: action.id,
      };
    case "CARRITO_ITEMS":
      return {
        ...state,
        items: action.items,
      };
    case "CARRITO_VACIO":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default sesionCarritoComprasReducer;
