import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const TipoRowTable = ({ tipoEquipo }) => {

  const [valoresFormulario, setValoresFormulario] = useState({})


  return (
    <tr>

      <td>{tipoEquipo.nombre}</td>
      <td>{tipoEquipo.estado}</td>
      <td>{tipoEquipo.fechaCreacion}</td>
      <td>{tipoEquipo.fechaActualizacion}</td>

      <td><Link type="button" className="btn btn-success" to={`tipo/edit/${tipoEquipo._id}`}>Editar</Link></td>
    </tr>
  )
}
