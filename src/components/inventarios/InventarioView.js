import React, { useEffect, useState } from 'react'
import { getInventarios } from '../../services/inventarioService'
import { InventarioCard } from './InventarioCard';
import { InventarioNew } from './InventarioNew';
import swal from 'sweetalert2';
export const InventarioView = () => {

  const [inventarios, setInventarios] = useState([]);
  const [openInventarioNew, setOpenInventarioNew] = useState(false);

  const listarInventarios = async () => {
    try {
      swal.fire({ // sirve para mostrar alerta de cargando 
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      swal.showLoading();
      const { data } = await getInventarios();
      setInventarios(data);
      console.log(data);
      swal.close()
    } catch (error) {
      console.log(error)
      swal.close()
    }
  };

  useEffect(() => {
    listarInventarios();
  }, [])

  const handleOpenModal = () => {
    setOpenInventarioNew(!openInventarioNew)
  }

  return (
    <>
      <div className='container'>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-3">
          {
            inventarios.map((inventario) => {
              return <InventarioCard key={inventario._id} inventario={inventario} />
            })
          }
        </div>
        {
          openInventarioNew ? // if terciario ( openInventarioNew == true)  
            <InventarioNew handleOpenModal={handleOpenModal} listarInventarios={listarInventarios} />
            :                 // else
            <button type="button" className="btn btn-secondary fab"
              onClick={handleOpenModal} >
              <i className="fa-solid fa-plus"></i></button>
        }
      </div>
    </>
  )
}
