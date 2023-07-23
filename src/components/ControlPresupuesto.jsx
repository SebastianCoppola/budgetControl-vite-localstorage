import React, {useEffect, useState} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = (props) => {
    const {presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto} = props
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(()=>{
        let totalGastado = gastos.reduce((total, gasto)=> parseInt(gasto.gasto) + total, 0)
        let totalDisponible = presupuesto - totalGastado
        let totalPorcentaje = ((presupuesto - totalDisponible)/presupuesto)*100
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setTimeout(()=>{
            setPorcentaje(totalPorcentaje.toFixed(2))
        },1500)
    },[gastos])

    const formatearCantidad = (cantidad) => {
        return Number(cantidad).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        let resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
        if(resultado){
            setPresupuesto(0)
            setGastos([])
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6'
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> { formatearCantidad(presupuesto) }
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> { formatearCantidad(disponible) }
                </p>
                <p>
                    <span>Gastado: </span> { formatearCantidad(gastado) }
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto