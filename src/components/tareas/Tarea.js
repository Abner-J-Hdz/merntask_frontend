import React, { useContext, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContex from '../../context/tareas/tareaContex';
import AlertaContext from '../../context/alertas/alertasContex';

const Tarea = ({tarea}) => {
    const proyectosContext = useContext(proyectoContext);
    //hacemos destructuring para obtener el proyecto actual
    const {  proyecto } = proyectosContext;
    //obtener el context de de tarea y obtener las funciones 
    //que necesitamos del contex
    const tareascontex = useContext(tareaContex);
    const { mensaje, obtenerTareas, eliminarTarea, actualizarTarea, guardarTareaActual } = tareascontex;

    const alertasContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertasContext;
    //extraer el proyecto actual
    const [proyectoActual] = proyecto;

    useEffect(()=>{
        if(mensaje){
            mostrarAlerta( mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje]);

    //funcion que se ejecuta cuando el usuario presiona el btn eliminar tarea
    const tareaEliminar = (id, proyecto) => {

        eliminarTarea(id, proyectoActual._id);
        //este seria una forma  de obtener el id del proyecto
        //obtenerTareas(proyecto[0].id)//pero tambien podemoshacer desctruturing
        obtenerTareas(proyectoActual._id);
    }
    //console.log(tarea);
    //funcion que modifica el estado de un a tarea
    const cambiarEstado = (tarea) => {
        if (tarea.estado) {
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }

        actualizarTarea(tarea);
    }

    //selecionar tarea para editarla
    const seleccionarTarea = () => {
        guardarTareaActual(tarea);
    }

    return(
    <>
     {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>):null}     
            <li className="my-list-item pt-1 border-bottom animated_show_right" key={tarea._id}>
                    
                    <div className="">
                        <p>{tarea.nombre}</p>
                    </div>
                    <div className="acciones">
                    {
                        tarea.estado?
                        (
                            <button
                                type="button"
                                className="btn btn-sm btn-success mr-1 "
                                onClick={() => cambiarEstado(tarea)}
                            >
                                Completo
                            </button>
                        )
                        :
                        (
                            <button
                                type="button"
                                className=" btn btn-sm btn-warning mr-1"
                                onClick={() => cambiarEstado(tarea)}
                            >
                                Incompleto
                            </button>                     
                        )
                    }                
                        <button
                            type="button"
                            className="btn btn-sm bg-primary text-white mr-1" 
                        onClick={() => seleccionarTarea(tarea)}
                        >
                            Editar
                        </button>

                        <button
                            type="button"
                            className="btn btn-sm btn-danger text-white mr-1"
                            onClick={() => tareaEliminar(tarea._id)}
                        >
                            Eliminar
                        </button>
                    </div>
            </li>
    </>
    );
}
export default Tarea;