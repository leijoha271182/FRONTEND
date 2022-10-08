import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'



export const UsuarioRowTable = ({ usuario, usuarios }) => {

    
    return (
        <tr>
                      
            <td>{usuario.nombre}</td>
            <td>{usuario.email}</td>
            <td>{usuario.estado}</td>
            <td>{usuario.fechaCreacion}</td>
            <td>{usuario.fechaActualizacion}</td>
            
            <td>
                <Link type="button" className="btn btn-success" to={`usuario/edit/${usuario._id}`}>Editar</Link>
                <button type="button" className='btn btn-danger'>Eliminar</button>
            </td>
        </tr>
    )
}
