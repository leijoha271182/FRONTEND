import React, { useState, useEffect } from 'react'
import { getEstadoEquipos, postEstadoEquipos } from '../../services/estadoEquipoService'
import swal from 'sweetalert2'
import { EstadoRowTable } from './EstadoRowTable'
import serverConfig from '../../config/server';

export const EstadosView = () => {

  const [valoresForm, setValoresForm] = useState({})
  const { nombre = '',  estado = '' } = valoresForm
  const [estadoEquipos, setEstadoEquipos] = useState([]);
  const [estadoEquipo, setEstadoEquipo] = useState({})

  const listarEstadoEquipos = async () => {
    // try {
    //     const { data } = await getEstadoEquipos()
    //     setEstadoEquipos(data)
    // } catch (error) {
    //     console.log(error);
    // }
    await fetch(`${serverConfig.urlBaseServer}/estado-equipo/`,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then(res => res.json())
      .then(resp => {
        //console.log(resp)
        setEstadoEquipos(resp)
      })
}

useEffect( () => {
  listarEstadoEquipos()
}, [])


const handleOnChange = ({ target }) => { // va a recibir los valores de los input del formulario
  const {name, value } = target
  setValoresForm({...valoresForm, [name]: value}) //... spread llama todo lo que tiene el array
}

const handleOnSubmit = async (e) => {
  e.preventDefault();
  //console.log(valoresForm)
  const estadoNuevo = {
      nombre, estado
  }
  //console.log(estadoNuevo);
  await fetch(`${serverConfig.urlBaseServer}/estado-equipo`,{
    
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(estadoNuevo),
    })
      .then(resp => resp.json())
      .then(data=> {
        //console.log(data)
        listarEstadoEquipos()
        e.target.reset()
      })
}


// funcion para editar
const editar = (id, nombre, estado) => {
  console.log(id, nombre, estado)
  setEstadoEquipo({
    nombre: nombre,
      estado: estado,
  })
}
useEffect(() => {
  if (estadoEquipo) {
    setValoresForm({  // con este recuperamos los datos del activo 
      nombre: estadoEquipo.nombre,
      estado: estadoEquipo.estado,

    })
  }
}, [estadoEquipo])


  return (
    <div className='container-fluid'>
      <div className="card">
        <div className='card-header'>
          <h5 className='card-title'>Estados de Equipo</h5>
        </div>
        <div className="card-body">
          <div className='row'>
            <form onSubmit={(e) => handleOnSubmit(e)} id='formulario' >
              <div className='row'>
                <div className='col-4'>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name='nombre' value={nombre} required 
                    onChange={(e) => handleOnChange(e) } className="form-control" />
                  </div>
                </div>
                
                <div className='col-4'>
                  <label className="form-label">Estado</label>
                  <select className="form-select" name='estado'
                   onChange={(e) => handleOnChange(e) } value={estado} required>
                    <option value=''>--Seleccionar--</option>
                    <option value='Activo'>Activo</option>
                    <option value='Inactivo'>Inactivo</option>

                  </select>
                </div>
              </div>
              <div className='row'>
                <div className='col-1 '>
                  <button className="btn btn-secondary ">Guardar</button>
                </div>
                <div className='col-1 '>
                  <button type='button'  className="btn btn-danger">Cancelar</button>
                </div>
              </div>
            </form>
          </div>
          <div className='row mt-5'>
            <table className="table table-striped">
              <thead>
                <tr>
                  
                  <th scope="col">Nombre</th>
                  <th scope="col">Status</th>
                  <th scope="col">Fecha creación</th>
                  <th scope="col">Fecha Actualización</th>
                </tr>
              </thead>
              <tbody>
                {
                  estadoEquipos.map((estado) => {
                    
                    return <EstadoRowTable key={estado._id} listarEstadoEquipos={listarEstadoEquipos} estado={estado} editar={editar}/>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
