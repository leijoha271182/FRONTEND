import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert2';
import { putEstadoEquipo, getEstadoEquipoId } from '../../services/estadoEquipoService';


export const EstadoUpdate = () => {

    const { estadoId = '' } = useParams();
    const [estadoNew, setEstadoNew] = useState({})
    const [valoresForm, setValoresForm] = useState({})
    const { nombre = '', estado = '' } = valoresForm

    const getEstado = async () => {
        try {
            swal.fire({ // sirve para mostrar alerta de cargando 
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            swal.showLoading();
            const { data } = await getEstadoEquipoId(estadoId);
            console.log(data);
            setEstadoNew(data) // se le agrega la data a inventario
            swal.close()
        } catch (error) {
            console.log(error);
            swal.close()
        }
    }

    useEffect(() => {
        getEstado()
    }, [estadoId]);

    useEffect(() => {
        if (estadoNew) {
            setValoresForm({  // con este recuperamos los datos del activo 
                nombre: estadoNew.nombre,
                estado: estadoNew.estado

            })
        }
    }, [estadoNew])

    const handleOnChange = ({ target }) => { // va a recibir los valores de los input del formulario
        const { name, value } = target
        setValoresForm({ ...valoresForm, [name]: value }) //... spread llama todo lo que tiene el array
    }

    const handleOnSubmit = async (e) => { // ESTEEEEEEEEEEEE
        e.preventDefault();
        const estadoUpdate = {
            nombre, estado
        }

        try {
            swal.fire({ // sirve para mostrar alerta de cargando 
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            swal.showLoading(); // se llama la alerta de cargando
            const { data } = await putEstadoEquipo(estadoId, estadoUpdate)
            console.log(data);
            swal.close();

        } catch (error) {
            console.log(error);
            swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data
            } else {
                mensaje = 'Ocurrio un error por favor intente de nuevo'
            }
            swal.fire('Error', mensaje, 'error')
        }
    }


    return (
        <div className='container-fluid'>
            <div className="card">
                <div className='card-header'>
                    <h5 className='card-title'>Actualizar Estado de Equipo</h5>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <form onSubmit={(e) => handleOnSubmit(e)} id='formulario' >
                            <div className='row'>
                                <div className='col-4'>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input type="text" name='nombre' value={nombre} required
                                            onChange={(e) => handleOnChange(e)} className="form-control" />
                                    </div>
                                </div>

                                <div className='col-4'>
                                    <label className="form-label">Estado</label>
                                    <select className="form-select" name='estado'
                                        onChange={(e) => handleOnChange(e)} value={estado} >
                                        <option value=''>--Seleccionar--</option>
                                        <option value='Activo'>Activo</option>
                                        <option value='Inactivo'>Inactivo</option>

                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-1'>
                                    <button className="btn btn-secondary">Guardar</button>
                                </div>
                                <div className='col-1'>
                                    <a type="button" className="btn btn-danger" href='/estados'>Salir</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
