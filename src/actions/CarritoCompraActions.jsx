import HttpCliente from "../servicios/HttpCliente";
import axios from "axios";

let carritoCancelSource = null;
export const getCarritoCompra = (dispatch, userId) => {
  if (carritoCancelSource) carritoCancelSource.cancel();
  carritoCancelSource = axios.CancelToken.source();
  return HttpCliente.get(`/carritocompra/${userId}`, { cancelToken: carritoCancelSource.token })
    .then(res => {
      const { id, items } = res.data;
      dispatch({ type: "CARRITO_SESION", id });
      dispatch({ type: "CARRITO_ITEMS", items });
      return res.data;
    })
    .catch(err => {
      if (!axios.isCancel(err)) console.error(err);
      return Promise.reject(err);
    });
};
export const cancelarGetCarrito = () => {
  if (carritoCancelSource) carritoCancelSource.cancel();
};
