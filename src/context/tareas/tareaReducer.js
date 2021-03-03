import {
    TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, 
    TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA, VACIAR_TAREAS_PROYECTO, TAREA_ERROR
} from '../../types'

export default(state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return{
                ...state,
                tareasproyecto: action.payload
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                tareasproyecto: [ action.payload,...state.tareasproyecto],
                errortarea: false
            }
        
        case VALIDAR_TAREA:
            return{
                ...state,
                errortarea: true
            }

        case ELIMINAR_TAREA:
            return{
                ...state,
                
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ?
                     action.payload : tarea)
            }
        case TAREA_ACTUAL:
            return{
                ...state,
                tareaseleccionada: action.payload,
            }

        case LIMPIAR_TAREA:
            return{
                ...state,
                tareaseleccionada: null
            }
        case VACIAR_TAREAS_PROYECTO:
            return{
                ...state,
                tareasproyecto: []
            }
        
        case TAREA_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        /*
        este case es igual a de estado tarea, por lo el otro case escuchara por los dos 
        ya que ejecutan el mismo codigo 
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ?
                     action.payload : tarea)               
            }*/
        default:
            break;
    }   
}