import React, { useContext } from 'react';
//import { CSSTransition, TransitionGroup} from 'react-transition-group'
import Tarea from '../tareas/Tarea'
import proyectoContex from '../../context/proyectos/proyectoContext'
import tareaContex from '../../context/tareas/tareaContex'

const ListadoTareas = () => {

    //extraer proyectos de state inicial
    const proyectosContex = useContext(proyectoContex);
    const { proyecto, eliminaProyecto} =  proyectosContex;

    //obtener las tarea del proyecto
    const tareasContext = useContext(tareaContex);
    const { tareasproyecto } = tareasContext;//obtenemos las tareas del proyecto actual

    //Si no hay proyecto selecionado, dado que si array esta vacio
    //y si aplica destructuring nos dara un error
    if(!proyecto) return <h2 className="font-weight-bold text-info text-center">Seleciona un proyecto</h2>

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto
    
    //elimina un proyecto
    const onClickEliminar = () => {
        //console.log(proyectoActual._id);
        eliminaProyecto(proyectoActual._id);
    }

    return(
        <>
            <h1 className="font-weight-bold text-info text-center mt-4">{proyectoActual.nombre}</h1>
            <ul className="list-group my-list-tareas">
                {tareasproyecto.length === 0 
                    ? 
                    (<li className="list-item" key={Math.random()}><h4 className="text-center mt-4">No hay Tarea</h4></li>)                
                    :
                    (
                        tareasproyecto.map(tarea => (
                            <Tarea 
                                key={tarea._id}
                                tarea={tarea}
                            /> 
                        ))
                   )
                } 
            </ul>
            <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={onClickEliminar}
             >
                 Eliminar Proyecto &times;
            </button>
        </>
    );
}

export default ListadoTareas;