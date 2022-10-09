import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { getUsuarioId, putUsuario } from '../../services/usuarioService';
// import swal from 'sweetalert2';
import serverConfig from '../../config/server';


export const UsuarioUpdate = () => {

    const params = useParams()
    const [ usuario, setUsuario ] = useState({})
    const [valoresForm, setValoresForm] = useState({})
    const { nombre = '', email = '', estado = '' } = valoresForm

    //console.log(params)

    const getUsuario = async () => {
        await fetch(`${serverConfig.urlBaseServer}/usuario/${params.usuarioId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "GET",
        })
            .then(res => res.json())
            .then(data =>{
                //console.log(data)
                setUsuario(data.usuario)
            })
    }

    useEffect(() => {
        getUsuario()
    }, []);

    useEffect(() => {
        if (usuario) {
          setValoresForm({  // con este recuperamos los datos del activo 
            nombre: usuario.nombre,
            email: usuario.email,
            estado: usuario.estado,
      
          })
        }
      }, [usuario])

      const handleOnChange = ({ target }) => { // va a recibir los valores de los input del formulario
        const { name, value } = target
        setValoresForm({ ...valoresForm, [name]: value }) //... spread llama todo lo que tiene el array
    }

      const handleOnSubmit = async (e) => { // ESTEEEEEEEEEEEE
        e.preventDefault();
        const usuarioUpdate = {
            nombre,email,estado
        }
        //console.log(usuarioUpdate)

        await fetch(`${serverConfig.urlBaseServer}/usuario/${params.usuarioId}/put`,
        {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(usuarioUpdate),
        })
        .then(resp => resp.json())
        .then(data=> {
            console.log(data)
        })
      
        // try {
        //     swal.fire({ // sirve para mostrar alerta de cargando 
        //         allowOutsideClick: false,
        //         text: 'Cargando...'
        //     });
        //     swal.showLoading(); // se llama la alerta de cargando
        //     const { data } = await putUsuario(usuarioId, usuarioUpdate )
        //     console.log(data);
        //     swal.close();
      
        // } catch (error) {
        //     console.log(error);
        //     swal.close();
        //     let mensaje;
        //     if (error && error.response && error.response.data ) {
        //         mensaje = error.response.data
        //     }else{
        //         mensaje = 'Ocurrio un error por favor intente de nuevo'
        //     }
        //     swal.fire('Error',mensaje,'error')
        // }
      }


    return (
        <div className='container-fluid'>
            <div className="card">
                <div className='card-header'>
                    <h5 className='card-title'>Actualizar Usuario</h5>
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
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="text" name='email' value={email} required
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
                                    <a type="button" className="btn btn-danger" href='/usuarios'>Salir</a>
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
