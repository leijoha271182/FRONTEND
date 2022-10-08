import React from 'react'
import { Link } from 'react-router-dom'

export const InventarioCard = ({ inventario }) => {
    return (
        <div className="col" >
            <div className="card card-inventarios">
                <img src={inventario.foto} className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text">serial: {inventario.serial} - modelo: {inventario.modelo}</p>
                    <h5 className="card-title">Caracteristicas</h5>
                    <p className="card-text">  {inventario.marca.nombre}</p>
                    <p className="card-text">{inventario.descripcion} - color: {inventario.color}</p>
                    <p className="card-text"> color: {inventario.color}</p>
                    <h6 className="card-title">precio: {inventario.precio}</h6>
                    <p className="card-text"> <Link to={`inventario/edit/${inventario._id}`}>Ver Más</Link></p>
                </div>
            </div>
        </div>
    )
}
