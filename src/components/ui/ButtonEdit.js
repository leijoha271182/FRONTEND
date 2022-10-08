import React from 'react'

export const ButtonEdit = ({ marca }) => {


  return (
    <td><button type="button" onClick={ btnEditar} value={marca._id} className="btn btn-success">Actualizar</button></td>
  )
}
