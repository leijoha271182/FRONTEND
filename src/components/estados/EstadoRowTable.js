import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const EstadoRowTable = ({ estado, editar }) => {


  return (
    <tr>
            
            <td>{estado.nombre}</td>
            <td>{estado.estado}</td>
            <td>{estado.fechaCreacion}</td>
            <td>{estado.fechaActualizacion}</td>
            
            <td><Link type="button" className="btn btn-success" to={`estado/edit/${estado._id}`}>Editar</Link></td>
        </tr>
  )
}
