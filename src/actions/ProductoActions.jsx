// src/actions/ProductoActions.js
import HttpCliente from '../servicios/HttpCliente';
import { uploadImage } from '../firebase/index';

/**
 * Permite registrar un nuevo producto en el backend
 * @param {object} producto - Objeto con los datos del producto y el archivo en .file
 * @returns {Promise<any>} - Respuesta del servidor
 */
export const registrarProducto = async (producto) => {
  // Subir imagen a Firebase y obtener URL
  const urlImage = await uploadImage(producto.file);

  // Mapear solo los campos que el backend espera
  const productoFinal = {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    imagen: urlImage,
    stock: producto.unidades,
    marcaId: parseInt(producto.marcaId, 10),
    categoriaId: parseInt(producto.categoriaId, 10)
  };

  // Petición POST
  return new Promise((resolve, reject) => {
    HttpCliente.post('/productos', productoFinal)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response?.data || error));
  });
};

/**
 * Permite actualizar un producto existente
 * @param {number|string} id - ID del producto a actualizar
 * @param {object} producto - Objeto con los datos del producto (y opcionalmente .file)
 * @returns {Promise<any>} - Respuesta del servidor
 */
export const actualizarProducto = async (id, producto) => {
  // Determinar URL de la imagen: si subió un nuevo archivo, subirlo
  let urlImage = producto.imagen;
  if (producto.file) {
    urlImage = await uploadImage(producto.file);
  }

  const productoFinal = {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    imagen: urlImage,
    stock: producto.unidades,
    marcaId: parseInt(producto.marcaId, 10),
    categoriaId: parseInt(producto.categoriaId, 10)
  };

  // Petición PUT
  return new Promise((resolve, reject) => {
    HttpCliente.put(`/productos/${id}`, productoFinal)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response?.data || error));
  });
};

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
