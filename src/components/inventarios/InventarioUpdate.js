import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getInventarioId, putInventarios } from '../../services/inventarioService';
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTipoEquipos } from '../../services/tipoEquipoService';
import { getEstadoEquipos } from '../../services/estadoEquipoService';
import swal from 'sweetalert2';

export const InventarioUpdate = () => {
    const { inventarioId = '' } = useParams();
    // console.log(inventarioId)

    const [inventario, setInventario] = useState({})
    const [valoresForm, setValoresForm] = useState({})
    const { serial = '', modelo = '', descripcion = '', color = '', foto = '',
        fechaCompra = '', precio = '', usuario = '', marca = '',
        tipoEquipo = '', estadoEquipo = '' } = valoresForm // desestructurar el objeto valoresForm
    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipoEquipos, setTipoEquipos] = useState([]);
    const [estadoEquipos, setEstadoEquipos] = useState([]);

    const listarUsuarios = async () => {
        try {
            const { data } = await getUsuarios(); //desestructuro la respuesta y solo recibo data
            setUsuarios(data)
        } catch (error) {
            console.log(error);
        }
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

    const getInventario = async () => {
        try {
            swal.fire({ // sirve para mostrar alerta de cargando 
                allowOutsideClick:false,
                text: 'Cargando...'
            });
            swal.showLoading();
            const { data } = await getInventarioId(inventarioId);
            console.log(data);
            setInventario(data) // se le agrega la data a inventario
            swal.close()
        } catch (error) {
            console.log(error);
            swal.close()
        }
    }

    useEffect(() => {
        getInventario()
    }, [inventarioId]);

    useEffect(() => {
        if (inventario) {
            setValoresForm({  // con este recuperamos los datos del activo 
                serial: inventario.serial,
                modelo: inventario.modelo,
                descripcion: inventario.descripcion,
                color: inventario.color,
                foto: inventario.foto,
                fechaCompra: inventario.fechaCompra,
                precio: inventario.precio,
                usuario: inventario.usuario,
                marca: inventario.marca,
                tipoEquipo: inventario.tipoEquipo,
                estadoEquipo: inventario.estadoEquipo
            })
        }
    }, [inventario])

    const handleOnSubmit = async (e) => {
        e.preventDefault();
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

        try {
            swal.fire({ // sirve para mostrar alerta de cargando 
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            swal.showLoading(); // se llama la alerta de cargando
            const { data } = await putInventarios(inventarioId, inventario)
            console.log(data);
            swal.close();

        } catch (error) {
            console.log(error);
            swal.close();
            let mensaje;
            if (error && error.response && error.response.data ) {
                mensaje = error.response.data
            }else{
                mensaje = 'Ocurrio un error por favor intente de nuevo'
            }
            swal.fire('Error',mensaje,'error')
        }
    }

    const handleOnChange = ({ target }) => { // va a recibir los valores de los input del formulario
        const { name, value } = target
        setValoresForm({ ...valoresForm, [name]: value }) //... spread llama todo lo que tiene el array
    }



    return (
        <div className='container-fliud mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle activo</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-4 col-4 col-sm-12'>
                            <img src={inventario?.foto}></img>
                        </div>
                        <div className='col-md-8 col-8 col-sm-12'>
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
                                    <div className='col-1'>
                                        <button className="btn btn-secondary">Guardar</button>
                                    </div>
                                    <div className='col mx-4'>
                                    <a type="button" className="btn btn-danger" href='/'>Salir</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
