import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import {generarId} from './helpers/index.jsx'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'


function App() {
	const [presupuesto, setPresupuesto] = useState(
		Number(localStorage.getItem('presupuesto')) ?? 0
	)
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
	const [modal, setModal] = useState(false)
	const [animarModal, setAnimarModal] = useState(false)
	const [gastos, setGastos] = useState(
		localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
	)
	const [gastoEditar, setGastoEditar] = useState({})
	const [filtro, setFiltro] = useState('')
	const [gastosFiltrados, setGastosFiltrados] = useState([])

	useEffect(()=>{
		if(Object.keys(gastoEditar).length > 0){
			openModal()
		}
	},[gastoEditar])

	useEffect(()=>{
		localStorage.setItem('presupuesto', presupuesto ?? 0)
	},[presupuesto])

	useEffect(()=>{
		localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
	},[gastos])

	useEffect(()=>{
		let presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
		if(presupuestoLS > 0) setIsValidPresupuesto(true)
	},[])

	useEffect(()=>{
		if(filtro){
			let tempGastosFiltrados = gastos.filter( it => it.categoria === filtro)
			setGastosFiltrados(tempGastosFiltrados)
		}else{
			setGastosFiltrados([])
		}
	},[filtro])

	const handleNuevoGasto = () => {
		setGastoEditar({})
		openModal()
	}

	const openModal = () => {
		setModal(true)
		setTimeout(()=>{
			setAnimarModal(true)
		},500)
	}

	const guardarGasto = nuevoGasto => {
		if(nuevoGasto.id){
			let gastosActualizados = gastos.map(it => it.id === nuevoGasto.id ? nuevoGasto : it)
			setGastos(gastosActualizados)
		}else{
			nuevoGasto.id = generarId()
			nuevoGasto.fecha = Date.now()
			setGastos([...gastos, nuevoGasto])	
		}
		setAnimarModal(false)
        setTimeout(()=> { setModal(false) }, 500)
	}

	const eliminarGasto = id => {
		let gastosActualizados = gastos.filter(it => it.id !== id)
		setGastos(gastosActualizados)
	}

	return (
		<div className={modal ? 'fijar' : ''}>
			<Header 
				gastos={gastos}
				setGastos={setGastos}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>
			
			{isValidPresupuesto && 
				<>
					<main>
						<Filtros 
							filtro={filtro}
							setFiltro={setFiltro}
						/>
						<ListadoGastos 
							gastos={gastos}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
							filtro={filtro}
							gastosFiltrados={gastosFiltrados}
						/>
					</main>
					<div className='nuevo-gasto'>
						<img 
							src={IconoNuevoGasto} 
							alt='icono nuevo gasto' 
							onClick={handleNuevoGasto}
						/>
					</div>
				</>
			}

			{modal && 
				<Modal 
					setModal={setModal} 
					animarModal={animarModal} 
					setAnimarModal={setAnimarModal}
					guardarGasto={guardarGasto}
					gastoEditar={gastoEditar}
					setGastoEditar={setGastoEditar}
				/>
			}
		</div>

	)
}

export default App
