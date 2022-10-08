import { axiosInstance, AxiosInstance } from "../helpers/axios-config";

const getTipoEquipos = () => {
    return axiosInstance.get('tipo-equipo', { //se llama la ruta deseada en este caso inventario
        headers: {
            'Content-type': 'application/json'   // se dice como se quiere recibir la respuesta en este caso JSON
        }
    })
}

const postTipoEquipos = (data) => {

    const respuesta = axiosInstance.post('tipo-equipo', data, { 
        headers: {
            'Content-type': 'application/json'   
        }
    });

    return respuesta;
};

const putTipoEquipo = (tipoEquipoid, data) => {

    const respuesta = axiosInstance.put(`tipo-equipo/${tipoEquipoid}`, data, { 
        headers: {
            'Content-type': 'application/json'   
        }
    });

    return respuesta;
};

const getTipoEquipoId = (tipoEquipoId) => {

    const respuesta = axiosInstance.get(`tipo-equipo/${tipoEquipoId}`, { //se llama la ruta deseada 
        headers: {
            'Content-type': 'application/json'   // se dice como se quiere recibir la respuesta en este caso JSON
        }
    });

    return respuesta;
};



export {
    getTipoEquipos,
    postTipoEquipos,
    putTipoEquipo,
    getTipoEquipoId
}