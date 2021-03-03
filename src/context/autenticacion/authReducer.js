import { 
    REGISTRO_EXITOSO, REGISTRO_ERROR,
    OBTENER_USUARIO,LOGIN_ERROR,
    LOGIN_EXITOSO, CERRAR_SESION
    } from '../../types'
export default (state, action) =>{
    switch (action.type) {
        
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO: 
        //el token que nos manda el backend lo guardamos en locastorage
        localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                autenticado: true,
                mensaje: null
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR: 
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado:true,
                usuario:action.payload, 
                cargando: false
            }

        default:
            break;
    }
}