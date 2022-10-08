import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert2';
import { getTipoEquipoId, putTipoEquipo } from '../../services/tipoEquipoService';

export const TipoUpdate = () => {

    const { tipoId = '' } = useParams();
    const [tipo, setTipo] = useState({})
    const [valoresForm, setValoresForm] = useState({})
    const { nombre = '', estado = '' } = valoresForm

    const getTipo = async () => {
        try {
            swal.fire({ // sirve para mostrar alerta de cargando 
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            swal.showLoading();
            const { data } = await getTipoEquipoId(tipoId);
            console.log(data);
            setTipo(data) // se le agrega la data a inventario
            swal.close()
        } catch (error) {
            console.log(error);
            swal.close()
        }
    }

    useEffect(() => {
        getTipo()
    }, [tipoId]);

    useEffect(() => {
        if (tipo) {
            setValoresForm({  // con este recuperamos los datos del activo 
                nombre: tipo.nombre,
                estado: tipo.estado

            })
        }
    }, [tipo])

    const handleOnChange = ({ target }) => { // va a recibir los valores de los input del formulario
        const { name, value } = target
        setValoresForm({ ...valoresForm, [name]: value }) //... spread llama todo lo que tiene el array
    }

    const handleOnSubmit = async (e) => { // ESTEEEEEEEEEEEE
        e.preventDefault();
        const tipoUpdate = {
            nombre, estado
        }

        try {
            swal.fire({ // sirve para mostrar alerta de cargando 
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            swal.showLoading(); // se llama la alerta de cargando
            const { data } = await putTipoEquipo(tipoId, tipoUpdate)
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
                    <h5 className='card-title'>Actualizar Tipo de Equipo</h5>
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
                                    <a type="button" className="btn btn-danger" href='/tipos'>Salir</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )


}

