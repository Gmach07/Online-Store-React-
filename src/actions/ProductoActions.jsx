import HttpCliente from '../servicios/HttpCliente';

export const getProductos = ({ PageIndex, PageSize }) => {
   return new Promise((resolve, reject) => {
     HttpCliente.get(`api/productos?PageIndex=${PageIndex}&PageSize=${PageSize}`)
       .then(response => resolve(response.data))
       .catch(error => reject(error));
   });
 };

export const getProductosById = (id) => {
   return new Promise ((resolve, reject) => {
    HttpCliente.get(`api/productos/${id}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error)); 
   });
};


