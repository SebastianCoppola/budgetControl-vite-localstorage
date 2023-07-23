import React from 'react'

const Mensaje = (props) => {
    const {children, tipo} = props

    return (
        <div className={`alerta ${tipo}`}>
            {children}
        </div>
    )
}

export default Mensaje