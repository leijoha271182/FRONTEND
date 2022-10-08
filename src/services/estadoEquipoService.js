import { axiosInstance, AxiosInstance } from "../helpers/axios-config";

const getEstadoEquipos = () => {
    return axiosInstance.get('estado-equipo', { //se llama la ruta deseada en este caso inventario
        headers: {
            'Content-type': 'application/json'   // se dice como se quiere recibir la respuesta en este caso JSON
        }
    })
}

const postEstadoEquipos = (data) => {

    const respuesta = axiosInstance.post('estado-equipo', data, { 
        headers: {
            'Content-type': 'application/json'   
        }
    });

    return respuesta;
};

const putEstadoEquipo = (estadoEquipoid, data) => {

    const respuesta = axiosInstance.put(`estado-equipo/${estadoEquipoid}`, data, { 
        headers: {
            'Content-type': 'application/json'   
        }
    });

    return respuesta;
};


const getEstadoEquipoId = (estadoEquipoId) => {

    const respuesta = axiosInstance.get(`estado-equipo/${estadoEquipoId}`, { //se llama la ruta deseada 
        headers: {
            'Content-type': 'application/json'   // se dice como se quiere recibir la respuesta en este caso JSON
        }
    });

    return respuesta;
};



export {
    getEstadoEquipos,
    postEstadoEquipos,
    putEstadoEquipo,
    getEstadoEquipoId
}