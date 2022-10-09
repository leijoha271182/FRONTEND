import React, { useState, useEffect } from 'react'
// import { getUsuarios} from '../../services/usuarioService';
import { UsuarioRowTable } from './UsuarioRowTable';
import serverConfig from '../../config/server';


export const UsuariosView = () => {

  const [valoresForm, setValoresForm] = useState({})
  const { nombre = '', email = '', estado = '' } = valoresForm
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios()
  }, [])

  const getUsuarios = async() => {
    // await fetch(`${serverConfig.urlBaseServer}/usuario/usuariolist`,{
    await fetch(`${serverConfig.urlBaseServer}/usuario/userlist`,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then(res => res.json())
      .then(resp => {
        //console.log(resp)
        setUsuarios(resp.usuarios)
      })
  }

  const handleOnChange = ({ target }) => { // va a recibir los valores de los input del formulario
    const { name, value } = target
    setValoresForm({ ...valoresForm, [name]: value }) //... spread llama todo lo que tiene el array
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(valoresForm)
    const usuario = {
      nombre, email, estado
    }
    console.log(usuario)
    await fetch(`${serverConfig.urlBaseServer}/usuario/create`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(usuario),
    })
      .then(resp => resp.json())
      .then(data=> {
        console.log(data)
        getUsuarios()
        e.target.reset()
      })
  }

  return (
    <div className='container-fluid'>
      <div className="card">
        <div className='card-header'>
          <h5 className='card-title'>Usuarios</h5>
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
                <div className='col-1 '>
                  <button className="btn btn-secondary ">Guardar</button>
                </div>
                <div className='col-1 '>
                  <button type='button' className="btn btn-danger">Cancelar</button>
                </div>

              </div>
            </form>
          </div>
          <div className='row mt-5'>
            <table className="table table-striped">
              <thead>
                <tr>
                  
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Fecha creación</th>
                  <th scope="col">Fecha Actualización</th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map((usuario) => {

                    return <UsuarioRowTable key={usuario._id} usuariolis={getUsuarios()} usuario={usuario} usuarios={usuarios}/>
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
