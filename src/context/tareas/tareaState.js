import React, { useReducer } from 'react'
import tareaContext from './tareaContex'
import tareaReducer from './tareaReducer'
import clienteAxios from '../../config/axios'
import { 
    TAREAS_PROYECTO, AGREGAR_TAREA,
    VALIDAR_TAREA, ELIMINAR_TAREA,
    TAREA_ACTUAL,ACTUALIZAR_TAREA, 
    LIMPIAR_TAREA, VACIAR_TAREAS_PROYECTO,
    TAREA_ERROR
} 
from '../../types'

const TareaState = (props) => {
   const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null, 
        mensaje: null
   }

   //Crear dispatch y state
   const [state, dispatch] = useReducer(tareaReducer, initialState);

   //Crear las funciones

   //obtener tareas de un proyecto
   const obtenerTareas =  async (proyecto) => {
        try {
            const respuesta = await clienteAxios.get('/api/tareas/', {params:{proyecto}});
            //console.log(respuesta);
            //el payload va ser lo que viene de respuesta.data.tareas
            dispatch({
                type: TAREAS_PROYECTO,
                payload: respuesta.data.tareas
            })  
        } catch (error) {
            console.log(error);
        }
   }
   // agregar tarea al proyecto selecionado
   const agregarTarea = async (tarea) => {
        try {
            //console.log(tarea);
            //const respuesta = 
            await clienteAxios.post('/api/tareas', tarea);
            //console.log(respuesta);
            dispatch({
                type:AGREGAR_TAREA,
                payload: tarea
            })
            obtenerTareas(tarea.proyecto);
        } catch (error) {
            console.log(error);
        }
   }

   //Valida y muestra un error en caso de que sea necesario
   const validarTarea = () => {
       dispatch({
           type: VALIDAR_TAREA
       })
   }

    const eliminarTarea = async(id, proyecto) =>{
        try {
             await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});
            //console.log(respuesta);
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
            obtenerTareas(proyecto);

        } catch (error) {
            
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: TAREA_ERROR,
                payload:alerta
            })
            //console.log(error.response);
        }
    }

    //extrea una tarea para edicion 
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //cambia el estado de una tarea
    /*const cambiarEstadoTarea = (tarea)  => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })  
    }   */

    //edita una tarea
    const actualizarTarea = async (tarea) => {
        //console.log(tarea);
        const respuesta  = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea );
        //console.log(respuesta);
        try {

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: respuesta.data.tarea
            })
            obtenerTareas(tarea.proyecto);
        } catch (error) {
            console.log(error.response);
        }
    }

    //elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    //vacia el array de tareasProyectos
    const vaciarTareas = () =>{
        dispatch({
            type:VACIAR_TAREAS_PROYECTO
        })
    }
   return (
       <tareaContext.Provider
            value={{

                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea,
                vaciarTareas
            }}
       >
           {props.children}
       </tareaContext.Provider>
   )
}
export default TareaState;
