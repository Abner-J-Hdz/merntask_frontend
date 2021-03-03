import React, { useContext } from 'react';
import proyectoContex from '../../context/proyectos/proyectoContext'
import tareaContex from '../../context/tareas/tareaContex'

const Proyecto = (props) => {
    // obtener el state de proyecto
    const proyectosContext = useContext(proyectoContex);
    const { proyectoActual} = proyectosContext;

    //obtener la funcion del context tarea
    const tareasContext = useContext(tareaContex);
    const { obtenerTareas } = tareasContext;

    //Funcion para agragar el proyecto actual
    const selecionarProyecto = id => {
        proyectoActual(id);//Fijar un proyecto actual
        obtenerTareas(id);//Filtrar tareas cuando se le de click
    }

    const {proyecto} = props;
    return (

        <li className="my-list-item animated_show_fade" key={proyecto._id}>
            <button
                type="button"
                className="btn bg-light btn-block btn-sm mt-3"
                onClick={ () => selecionarProyecto(proyecto._id)}
            >
                { proyecto.nombre }
            </button>
        </li>

    );
}

export default Proyecto;