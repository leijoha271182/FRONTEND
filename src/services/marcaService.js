import { axiosInstance } from "../helpers/axios-config";

const getMarcas = () => {
    return axiosInstance.get('marca', { //se llama la ruta deseada en este caso inventario
        headers: {
            'Content-type': 'application/json'   // se dice como se quiere recibir la respuesta en este caso JSON
        }
    })
}

const postMarcas = (data) => {

    const respuesta = axiosInstance.post('marca', data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });

    return respuesta;
};

const putMarca = (marcaid, data) => {

    const respuesta = axiosInstance.put(`marca/${marcaid}`, data, { 
        headers: {
            'Content-type': 'application/json'   
        }
    });

    return respuesta;
};

const getMarcaId = (marcaId) => {

    const respuesta = axiosInstance.get(`marca/${marcaId}`, { //se llama la ruta deseada 
        headers: {
            'Content-type': 'application/json'   // se dice como se quiere recibir la respuesta en este caso JSON
        }
    });

    return respuesta;
};



export {
    getMarcas,
    postMarcas,
    putMarca,
    getMarcaId
}