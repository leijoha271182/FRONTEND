import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import serverConfig from '../../config/server';

export const EstadoRowTable = ({ estado, listarEstadoEquipos }) => {

  const handleDelete = async (estadoEquipoId) => {
    await fetch(`${serverConfig.urlBaseServer}/estado-equipo/${estadoEquipoId}/delete`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
    listarEstadoEquipos()
  }

  return (
    <tr>
      <td>{estado.nombre}</td>
      <td>{estado.estado}</td>
      <td>{estado.fechaCreacion}</td>
      <td>{estado.fechaActualizacion}</td>
      <td>
        <Link type="button" className="btn btn-success" to={`estado/edit/${estado._id}`}>Editar</Link>
        <button type="button" className="btn btn-danger" onClick={() => { handleDelete(estado._id) }}>Eliminar</button>
      </td>
    </tr>
  )
}
