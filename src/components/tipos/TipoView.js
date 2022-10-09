import React, { useState, useEffect } from 'react'
import swal from 'sweetalert2'
import {getTipoEquipos , postTipoEquipos } from '../../services/tipoEquipoService'
import { TipoRowTable } from './TipoRowTable'
import serverConfig from '../../config/server';


export const TipoView = () => {

  const [valoresForm, setValoresForm] = useState({})
  const { nombre = '',  estado = '' } = valoresForm
  const [tipoEquipos, setTipoEquipos] = useState([]);
  const [tipo, setTipo] = useState({})

  const listarTipoEquipos = async () => {
    try {
        const { data } = await getTipoEquipos()
        setTipoEquipos(data)
    } catch (error) {
        console.log(error);
    }
}

useEffect( () => {
  listarTipoEquipos()
}, [])

const handleOnChange = ({ target }) => { // va a recibir los valores de los input del formulario
  const {name, value } = target
  setValoresForm({...valoresForm, [name]: value}) //... spread llama todo lo que tiene el array
}

const handleOnSubmit = async (e) => {
  e.preventDefault();
  console.log(valoresForm)
  const tipoEquipo = {
      nombre, estado
  }
  console.log(tipoEquipo);
  await fetch(`${serverConfig.urlBaseServer}/tipo-equipo`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(tipoEquipo),
    })
      .then(resp => resp.json())
      .then(data=> {
        //console.log(data)
        listarTipoEquipos()
        e.target.reset()
  })
}

// funcion para editar
const editar = (id, nombre, estado) => {
  console.log(id, nombre, estado)
  setTipo({
    nombre: nombre,
      estado: estado,
  })
}
useEffect(() => {
  if (tipo) {
    setValoresForm({  // con este recuperamos los datos del activo 
      nombre: tipo.nombre,
      estado: tipo.estado,

    })
  }
}, [tipo])


  return (
    <div className='container-fluid'>
      <div className="card">
        <div className='card-header'>
          <h5 className='card-title'>Tipos de Equipo</h5>
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
                   onChange={(e) => handleOnChange(e) } value={estado} >
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
                  tipoEquipos.map((tipo) => {
                    
                    return <TipoRowTable key={tipo._id} listarTipoEquipos={listarTipoEquipos} tipoEquipo={tipo} editar={editar}/>
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
