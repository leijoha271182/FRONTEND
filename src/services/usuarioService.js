import { axiosInstance } from "../helpers/axios-config";

const getUsuarios = () => {
    return axiosInstance.get('usuario', { //se llama la ruta deseada en este caso inventario
        headers: {
            'Content-type': 'application/json'   // se dice como se quiere recibir la respuesta en este caso JSON
        }
    })
}

const postUsuarios = (data) => {

    const respuesta = axiosInstance.post('/usuario/create', data, { 
        headers: {
            'Content-type': 'application/json'   
        }
    });

    return respuesta;
};

const putUsuario = (usuarioid, data) => {

    const respuesta = axiosInstance.put(`usuario/${usuarioid}`, data, { 
        headers: {
            'Content-type': 'application/json'   
        }
    });

    return respuesta;
};

const getUsuarioId = (usuarioId) => {

    const respuesta = axiosInstance.get(`usuario/${usuarioId}`, { //se llama la ruta deseada 
        headers: {
            'Content-type': 'application/json'   // se dice como se quiere recibir la respuesta en este caso JSON
        }
    });

    return respuesta;
};



export {
    getUsuarios,
    postUsuarios,
    putUsuario,
    getUsuarioId
}