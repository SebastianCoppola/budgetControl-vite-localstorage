import React, {useEffect, useState} from 'react'
import IconCerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = props => {
    const {setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar} = props
    const [nombre, setNombre] = useState('')
    const [gasto, setGasto] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
			setNombre(gastoEditar.nombre)
            setGasto(gastoEditar.gasto)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
		}
    },[])

    const cerrarModal = () => {
        setGastoEditar({})
        setAnimarModal(false)
        setTimeout(()=>{
            setModal(false)
        },500)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if([nombre, gasto, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios.')
            setTimeout(()=>{
                setMensaje('')
            },3000)
            return
        }
        guardarGasto({nombre, gasto, categoria, id, fecha})
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img src={IconCerrarBtn} alt='cerrar modal' onClick={cerrarModal}/>
            </div>
            <form onSubmit={e => handleSubmit(e)} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlForm="nombre">Nombre Gasto</label>
                    <input 
                        id='nombre'
                        type='text'
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={(e)=>setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlForm="nombre">Cantidad</label>
                    <input 
                        id='cantidad'
                        type='number'
                        placeholder='Añade el monto del gasto'
                        value={gasto}
                        onChange={(e)=>setGasto(e.target.value)}/>
                </div>
                <div className='campo'>
                    <label htmlForm="nombre">Categoria</label>
                    <select
                        id='categoria'
                        value={categoria}
                        onChange={(e)=>setCategoria(e.target.value)}
                    >
                        <option value=''>-- Seleccione --</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='casa'>Casa</option>
                        <option value='comida'>Comida</option>
                        <option value='gastos'>Gastos</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='suscripciones'>Suscripciones</option>
                    </select>
                </div>
                <input type='submit' value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gastos'} />
            </form>
        </div>
    )
}

export default Modal