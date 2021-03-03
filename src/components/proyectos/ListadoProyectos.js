import React, { useContext, useEffect } from 'react';
//import { CSSTransition, TransitionGroup} from 'react-transition-group';
import Proyecto from './Proyecto';
import proyectoContex from '../../context/proyectos/proyectoContext'
import AlertaContex from '../../context/alertas/alertasContex'
//import ImgANR from '../../img/img1.jpg'

const ListadoProyectos = (props) => {
    //Extraer proyectos de state inicial
    const proyectosContex = useContext(proyectoContex);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContex;
    
    const alertaContex = useContext(AlertaContex);
    const { alerta, mostrarAlerta } = alertaContex;
    /*Obtener propyectos cuando cargue el componentes 
    *ya que este se ejecuta cada que algo cambien,para
    *que solo se ejecute pasamos un array vacio
    */

    useEffect(()=>{
        //en caso de que hayya un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        // eslint-disable-next-line
    },[mensaje])

    //Revisamos si proyecto viene vacio
    if (proyectos.length === 0 ) {
        return (
        <>
            <h4 className="text-center mt-2">No hay proyectos</h4>
        </>)
    }

    return( 
        <>
        {
            alerta ? (
            <div className={`alerta ${alerta.categoria}`}>
                {alerta.msg}
            </div>

            ) : (null)                  
        }  
        <ul className="list-group">
            {
             proyectos.map(proyecto =>(
                <Proyecto
                    key={proyecto._id}
                    proyecto={proyecto}
                />    
            ))              
            }
        </ul>
    </>
    );
}

export default ListadoProyectos;
