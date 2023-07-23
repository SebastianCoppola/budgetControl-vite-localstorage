import React from 'react'

const Filtros = props => {
    const {filtro, setFiltro} = props


    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filtrar Campos</label>
                    <select value={filtro} onChange={ e => setFiltro(e.target.value) }>
                        <option value=''>Todos</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='casa'>Casa</option>
                        <option value='comida'>Comida</option>
                        <option value='gastos'>Gastos</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='suscripciones'>Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filtros