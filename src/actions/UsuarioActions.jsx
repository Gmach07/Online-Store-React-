import HttpCliente from '../servicios/HttpCliente';

export const registrarUsuario = async usuario =>{
    return new Promise((resolve, reject) => {
        HttpCliente.post('/api/Usuario/registrar', usuario)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response.data);
            });
    });
}