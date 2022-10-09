import React, { useEffect, useState } from 'react'
import { getMarcas, postMarcas } from '../../services/marcaService'
import swal from 'sweetalert2'
import { MarcaRowTable } from './MarcaRowTable'
import serverConfig from '../../config/server';



export const MarcaView = () => {

  const [valoresForm, setValoresForm] = useState({})
  const { nombre = '', estado = '' } = valoresForm
  const [marcas, setMarcas] = useState([]);
  const [marca, setMarca] = useState({})
 

  const listarMarcas = async () => {
    // try {
    //   const { data } = await getMarcas()
    //   setMarcas(data)
    // } catch (error) {
    //   console.log(error);
    // }
    await fetch(`${serverConfig.urlBaseServer}/marca/`,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then(res => res.json())
      .then(resp => {
        //console.log(resp)
        setMarcas(resp)
      })
  }

  useEffect(() => {
    listarMarcas()
  }, [])

  const handleOnChange = ({ target }) => { // va a recibir los valores de los input del formulario
    const { name, value } = target
    setValoresForm({ ...valoresForm, [name]: value }) //... spread llama todo lo que tiene el array
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //console.log(valoresForm)
    const marca = {
      nombre, estado
    }
    console.log(marca);
    await fetch(`${serverConfig.urlBaseServer}/marca`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(marca),
    })
      .then(resp => resp.json())
      .then(data=> {
        //console.log(data)
        listarMarcas()
        e.target.reset()
      })
  }
  
  // funcion para editar
  const editar = (id, nombre, estado) => {
    //console.log(id, nombre, estado)
    setMarca({
      nombre: nombre,
        estado: estado,
    })
  }
  useEffect(() => {
    if (marca) {
      setValoresForm({  // con este recuperamos los datos del activo 
        nombre: marca.nombre,
        estado: marca.estado,

      })
    }
  }, [marca])


  return (
    <div className='container-fluid'>
      <div className="card">
        <div className='card-header'>
          <h5 className='card-title'>Marcas</h5>
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
                <div className='col-1 '>
                  <button className="btn btn-secondary ">Crear</button>
                </div>
                <div className='col-1 '>
                  <input type='reset' value='Cancelar' className="btn btn-danger" />
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
                  marcas.map((marca) => {

                    return <MarcaRowTable key={marca._id} listarmarcas={listarMarcas} marca={marca} editar={editar}/>
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
