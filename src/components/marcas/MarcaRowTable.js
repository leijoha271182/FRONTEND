import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import serverConfig from '../../config/server';

export const MarcaRowTable = ({ marca, listarmarcas }) => {

  const handleDelete = async (marcaId) => {
    await fetch(`${serverConfig.urlBaseServer}/marca/${marcaId}/delete`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
    listarmarcas()
  }

  return (
    <tr>
            
            <td>{marca.nombre}</td>
            <td>{marca.estado}</td>
            <td>{marca.fechaCreacion}</td>
            <td>{marca.fechaActualizacion}</td>

            <td>
              <Link type="button" className="btn btn-success" to={`marca/edit/${marca._id}`}>Editar</Link>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(marca._id)}>Eliminar</button>
            </td>
        </tr>
  )
}
