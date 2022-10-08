import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const MarcaRowTable = ({ marca }) => {


  return (
    <tr>
            
            <td>{marca.nombre}</td>
            <td>{marca.estado}</td>
            <td>{marca.fechaCreacion}</td>
            <td>{marca.fechaActualizacion}</td>

            <td><Link type="button" className="btn btn-success" to={`marca/edit/${marca._id}`}>Editar</Link></td>
        </tr>
  )
}
