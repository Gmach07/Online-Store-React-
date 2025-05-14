// src/actions/ProductoActions.js
import HttpCliente from '../servicios/HttpCliente';

/**
 * Obtiene un listado paginado de productos.
 * @param {{ PageIndex: number; PageSize: number }} params
 * @returns {Promise<any>} Datos de productos y metadatos de paginación
 */
export async function getProductos({ PageIndex, PageSize }) {
  try {
    const { data } = await HttpCliente.get('/productos', {
      params: { PageIndex, PageSize }
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Obtiene los detalles de un producto por su ID.
 * @param {string|number} id
 * @returns {Promise<any>} Datos del producto
 */
export async function getProductosById(id) {
  try {
    const { data } = await HttpCliente.get(`/productos/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

