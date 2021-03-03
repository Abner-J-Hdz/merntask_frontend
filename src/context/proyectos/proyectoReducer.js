import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTO, 
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR, VACIAR_PROYECTO
} from '../../types'

//reducer, similar a redux
//contiene la funciones que interactuan con los states
export default (state,action) => {
    //evaluamos el action.type,y siempre retornamosun state
    switch(action.type){
    //siempre debemos retornar un default
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario:true
            }
        case OBTENER_PROYECTO:
            return{
                ...state,
                proyectos:action.payload
            }
        case AGREGAR_PROYECTO:
            return{
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario: true
            }
        case PROYECTO_ACTUAL:
            return{
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)                
            }
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }
        
        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        
        case VACIAR_PROYECTO:
            return{
                ...state,
                proyectos : [],
                proyecto : null
            }

        default:
            return state;
    }
}

/** el de elimina proyect treamos todo los
 *  datos a excepcion del que pasamos como parametro */