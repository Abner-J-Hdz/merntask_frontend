import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios'
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTO,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR, VACIAR_PROYECTO } 
from '../../types'

//estado inicial de la administracion del proyecto, crud
const ProyectoState = (props) => {
    //similar a redux, definimos un state
    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);
 
    // serie de funciones para el crud
    /* aqui solo escribimos la funciones pero estas seran 
     * ejecutadads desde el reducer para que cambien el estado*/
    const mostrarFormulario = () => {
    /**dispact evaluara el type y estará atado al algo en switch*/
    //es como payload de redux
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }
    //obtener proyectos
    const obtenerProyectos = async() =>{
        try {
            const respuesta = await clienteAxios.get('/api/proyectos')

            dispatch({
                type:  OBTENER_PROYECTO, 
                payload: respuesta.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
           dispatch({
               type: PROYECTO_ERROR,
                payload: alerta
           })
        }
    }

    //Agregar proyectos
    const agregarProyecto = async(proyecto) => {
       try {
           const respuesta = await clienteAxios.post('/api/proyectos', proyecto);
           //console.log(respuesta);
            //insertamos el proyecto al state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: respuesta.data
            })
       } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
    }
    }

    //Validar el formulario por errores
    const mostrarError= () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }
//seleciona el proyecto donde el usuario dio click
    const proyectoActual = (proyectoId) =>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Elimina un proyecto
    const eliminaProyecto = async (proyectoId) =>{
        try {
            await clienteAxios.delete('/api/proyectos/'+ proyectoId );
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
           dispatch({
               type: PROYECTO_ERROR,
                payload: alerta
           })
        }
    }

    //Vaciar los proyectos almacenados en memoria
    const vaciarProyecto = () => {
        dispatch({
            type: VACIAR_PROYECTO
        })
    }
    
    //provider; de aqui nacen los datos por asi decirlo
    return (
       
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminaProyecto,
                vaciarProyecto
            }}
        >
            {props.children}
          
        </proyectoContext.Provider>

    );
}

export default ProyectoState;
            /** props.children; para que lo que vallamos a pasar
             * los diferentes componentes que sean hijos del provider
             * sean los consumer, y asi se pasen los datos a los diferentes 
             * componentes */