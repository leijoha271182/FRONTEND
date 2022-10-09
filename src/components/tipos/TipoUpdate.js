import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert2';
import { getTipoEquipoId, putTipoEquipo } from '../../services/tipoEquipoService';
import serverConfig from '../../config/server';

export const TipoUpdate = () => {

    const { tipoId = '' } = useParams();
    const [tipo, setTipo] = useState({})
    const [valoresForm, setValoresForm] = useState({})
    const { nombre = '', estado = '' } = valoresForm

    const getTipo = async () => {
        await fetch(`${serverConfig.urlBaseServer}/tipo-equipo/${tipoId}`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTipo(data.tipoEquipo) // se le agrega la data a inventario
            })
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

        await fetch(`${serverConfig.urlBaseServer}/tipo-equipo/${tipoId}`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(tipoUpdate)
            }).then(res=> res.json())
            .then(data => {
            console.log(data)
        })

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

