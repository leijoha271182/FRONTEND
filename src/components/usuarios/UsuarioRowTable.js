import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import server from '../../config/server'



export const UsuarioRowTable = ({ usuario, usuariolis }) => {

    const handleDelete = async(usuarioId) => {
        console.log('deleting user')
        await fetch(`${server.urlBaseServer}/usuario/${usuarioId}/delete`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "DELETE",
        })
        usuariolis()
    }
    
    return (
        <tr>
                      
            <td>{usuario.nombre}</td>
            <td>{usuario.email}</td>
            <td>{usuario.estado}</td>
            <td>{usuario.fechaCreacion}</td>
            <td>{usuario.fechaActualizacion}</td>
            
            <td>
                <Link type="button" className="btn btn-success" to={`usuario/edit/${usuario._id}`}>Editar</Link>
                <button type="button" className='btn btn-danger' onClick={() => {handleDelete(usuario._id)}}>Eliminar</button>
            </td>
        </tr>
    )
}
