import { axiosInstance } from "../helpers/axios-config";

const getInventarios = () => {

    const respuesta = axiosInstance.get('inventario', { //se llama la ruta deseada en este caso inventario
        headers: {
            'Content-type': 'application/json'   // se dice como se quiere recibir la respuesta en este caso JSON
        }
    });

    return respuesta;
};


const postInventarios = (data) => {

    const respuesta = axiosInstance.post('inventario', data, { 
        headers: {
            'Content-type': 'application/json'   
        }
    });

    return respuesta;
};

const putInventarios = (inventarioid, data) => {

    const respuesta = axiosInstance.put(`inventario/${inventarioid}`, data, { 
        headers: {
            'Content-type': 'application/json'   
        }
    });

    return respuesta;
};

const getInventarioId = (inventarioId) => {

    const respuesta = axiosInstance.get(`inventario/${inventarioId}`, { //se llama la ruta deseada en este caso inventario
        headers: {
            'Content-type': 'application/json'   // se dice como se quiere recibir la respuesta en este caso JSON
        }
    });

    return respuesta;
};





export {
    getInventarios,
    postInventarios,
    putInventarios,
    getInventarioId
}