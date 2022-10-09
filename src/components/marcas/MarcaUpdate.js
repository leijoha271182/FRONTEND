import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert2';
import { getMarcaId, putMarca } from '../../services/marcaService'
import serverConfig from '../../config/server';



export const MarcaUpdate = () => {

    const { marcaId = '' } = useParams();
    const [marca, setMarca] = useState({})
    const [valoresForm, setValoresForm] = useState({})
    const { nombre = '', estado = '' } = valoresForm

    const getMarca = async () => {
        await fetch(`${serverConfig.urlBaseServer}/marca/${marcaId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setMarca(data.marca) // se le agrega la data a inventario
        })
}

useEffect(() => {
    getMarca()
}, [marcaId]);

useEffect(() => {
    if (marca) {
        setValoresForm({  // con este recuperamos los datos del activo 
            nombre: marca.nombre,
            estado: marca.estado

        })
    }
}, [marca])

const handleOnChange = ({ target }) => { // va a recibir los valores de los input del formulario
    const { name, value } = target
    setValoresForm({ ...valoresForm, [name]: value }) //... spread llama todo lo que tiene el array
}

const handleOnSubmit = async (e) => { // ESTEEEEEEEEEEEE
    e.preventDefault();
    const marcaUpdate = {
        nombre, estado
    }

    await fetch(`${serverConfig.urlBaseServer}/marca/${marcaId}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(marcaUpdate)
    }).then(res=> res.json())
    .then(data => {
        console.log(data)
    })

    // try {
    //     swal.fire({ // sirve para mostrar alerta de cargando 
    //         allowOutsideClick: false,
    //         text: 'Cargando...'
    //     });
    //     swal.showLoading(); // se llama la alerta de cargando
    //     const { data } = await putMarca(marcaId, marcaUpdate)
    //     console.log(data);
    //     swal.close();

    // } catch (error) {
    //     console.log(error);
    //     swal.close();
    //     let mensaje;
    //     if (error && error.response && error.response.data) {
    //         mensaje = error.response.data
    //     } else {
    //         mensaje = 'Ocurrio un error por favor intente de nuevo'
    //     }
    //     swal.fire('Error', mensaje, 'error')
    // }
}


return (
    <div className='container-fluid'>
        <div className="card">
            <div className='card-header'>
                <h5 className='card-title'>Actualizar Marca</h5>
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
                                <a type="button" className="btn btn-danger" href='/marcas'>Salir</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
)

  
}
