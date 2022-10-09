import React, { useState, useEffect } from 'react'
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTipoEquipos } from '../../services/tipoEquipoService';
import { getEstadoEquipos } from '../../services/estadoEquipoService';
import { postInventarios } from '../../services/inventarioService';
import swal from 'sweetalert2'; //se usa para alertas en este caso para mostrar cargando...
import serverConfig from '../../config/server';

export const InventarioNew = ({ handleOpenModal, listarInventarios }) => {

    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipoEquipos, setTipoEquipos] = useState([]);
    const [estadoEquipos, setEstadoEquipos] = useState([]);
    const [valoresForm, setValoresForm] = useState({})
    const { serial = '', modelo = '', descripcion = '', color = '', foto = '',
        fechaCompra = '', precio = '', usuario = '', marca = '',
        tipoEquipo = '', estadoEquipo = '' } = valoresForm // desestructurar el objeto valoresForm

    const listarUsuarios = async () => {
        await fetch(`${serverConfig.urlBaseServer}/usuario/userlist`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsuarios(data.usuarios) // se le agrega la data a inventario
            })
        // try {
        //     const { data } = await getUsuarios(); //desestructuro la respuesta y solo recibo data
        //     setUsuarios(data)
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const listarMarcas = async () => {
        try {
            const { data } = await getMarcas()
            setMarcas(data)
        } catch (error) {
            console.log(error);
        }
    }

    const listarTipoEquipos = async () => {
        try {
            const { data } = await getTipoEquipos()
            setTipoEquipos(data)
        } catch (error) {
            console.log(error);
        }
    }

    const listarEstadoEquipos = async () => {
        try {
            const { data } = await getEstadoEquipos()
            setEstadoEquipos(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarUsuarios()
    }, [])

    useEffect(() => {
        listarMarcas()
    }, [])

    useEffect(() => {
        listarTipoEquipos()
    }, [])

    useEffect(() => {
        listarEstadoEquipos()
    }, [])

    const handleOnChange = ({ target }) => { // va a recibir los valores de los input del formulario
        const { name, value } = target
        setValoresForm({ ...valoresForm, [name]: value }) //... spread llama todo lo que tiene el array
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(valoresForm)
        const inventario = {
            serial, modelo, descripcion, color, foto, fechaCompra, precio,
            usuario: {
                _id: usuario
            },
            marca: {
                _id: marca
            },
            tipoEquipo: {
                _id: tipoEquipo
            },
            estadoEquipo: {
                _id: estadoEquipo
            }
        }
        console.log(inventario);
    
        await fetch(`${serverConfig.urlBaseServer}/inventario/`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(inventario),
            })
            .then(resp => resp.json())
            .then(data => {
                //console.log(data)
                listarMarcas()
                e.target.reset()
            })
        // try {
        //     swal.fire({ // sirve para mostrar alerta de cargando 
        //         allowOutsideClick:false,
        //         text: 'Cargando...'
        //     });
        //     swal.showLoading(); // se llama la alerta de cargando
        //     const { data } = await postInventarios(inventario)
        //     console.log(data);
        //     swal.close();
        //     handleOpenModal();
        //     listarInventarios();
        // } catch (error) {
        //     console.log(error);
        //     swal.close();
        // }
    }

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nuevo Inventario</h3>
                            <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Serial</label>
                                    <input type="text" name='serial' value={serial} required
                                        onChange={(e) => handleOnChange(e)} className="form-control" />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Modelo</label>
                                    <input type="text" name='modelo' value={modelo} required
                                        onChange={(e) => handleOnChange(e)} className="form-control" />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <input type="text" name='descripcion' value={descripcion} required
                                        onChange={(e) => handleOnChange(e)} className="form-control" />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Color</label>
                                    <input type="text" name='color' value={color} required
                                        onChange={(e) => handleOnChange(e)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Foto</label>
                                    <input type="url" name='foto' value={foto} required
                                        onChange={(e) => handleOnChange(e)} className="form-control" />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Fecha Compra</label>
                                    <input type="date" name='fechaCompra' value={fechaCompra} required
                                        onChange={(e) => handleOnChange(e)} className="form-control" />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Precio</label>
                                    <input type="text" name='precio' value={precio} required
                                        onChange={(e) => handleOnChange(e)} className="form-control" />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Usuario</label>
                                    <select className="form-select" required
                                        onChange={(e) => handleOnChange(e)} name='usuario' value={usuario}>
                                        <option value="">--Seleccione--</option>
                                        {
                                            usuarios.map((usuario) => {
                                                return <option key={usuario._id} value={usuario._id} >
                                                    {usuario.nombre}</option>
                                            })
                                        }

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Marca</label>
                                    <select className="form-select" required
                                        onChange={(e) => handleOnChange(e)} name='marca' value={marca}>
                                        <option value="">--Seleccione--</option>
                                        {
                                            marcas.map((marca) => {
                                                return <option key={marca._id} value={marca._id} >
                                                    {marca.nombre}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Tipo Equipo</label>
                                    <select className="form-select" required
                                        onChange={(e) => handleOnChange(e)} name='tipoEquipo' value={tipoEquipo}>
                                        <option value="">--Seleccione--</option>
                                        {
                                            tipoEquipos.map((tipoEquipo) => {
                                                return <option key={tipoEquipo._id} value={tipoEquipo._id} >
                                                    {tipoEquipo.nombre}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Estado Equipo</label>
                                    <select className="form-select" required
                                        onChange={(e) => handleOnChange(e)} name='estadoEquipo'
                                        value={estadoEquipo} >
                                        <option value="">--Seleccione--</option>
                                        {                               //desestructuro el objeto
                                            estadoEquipos.map(({ _id, nombre }) => {
                                                return <option key={_id} value={_id} >
                                                    {nombre}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <button className="btn btn-secondary">Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
