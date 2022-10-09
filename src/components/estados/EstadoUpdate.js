import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert2';
import { putEstadoEquipo, getEstadoEquipoId } from '../../services/estadoEquipoService';
import serverConfig from '../../config/server';


export const EstadoUpdate = () => {

    const { estadoId = '' } = useParams();
    const [estadoNew, setEstadoNew] = useState({})
    const [valoresForm, setValoresForm] = useState({})
    const { nombre = '', estado = '' } = valoresForm

    const getEstado = async () => {

        await fetch(`${serverConfig.urlBaseServer}/estado-equipo/${estadoId}`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEstadoNew(data.estadoEquipo) // se le agrega la data a inventario
            })
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

        await fetch(`${serverConfig.urlBaseServer}/estado-equipo/${estadoId}`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(estadoUpdate)
            }).then(res=> res.json())
            .then(data => {
            console.log(data)
        })

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
