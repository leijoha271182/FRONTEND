import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import serverConfig from '../../config/server';

export const TipoRowTable = ({ tipoEquipo, listarTipoEquipos }) => {

  const handleSubmit = async(estadoEquipoId) => {
    await fetch(`${serverConfig.urlBaseServer}/tipo-equipo/${estadoEquipoId}/delete`,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
      listarTipoEquipos()
  }


  return (
    <tr>

      <td>{tipoEquipo.nombre}</td>
      <td>{tipoEquipo.estado}</td>
      <td>{tipoEquipo.fechaCreacion}</td>
      <td>{tipoEquipo.fechaActualizacion}</td>

      <td>
        <Link type="button" className="btn btn-success" to={`tipo/edit/${tipoEquipo._id}`}>Editar</Link>
        <button type="button" className="btn btn-danger" onClick={() => {handleSubmit(tipoEquipo._id)}}>Eliminar</button>
      </td>
    </tr>
  )
}
