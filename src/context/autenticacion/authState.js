import React, { useReducer} from 'react';
import AuthReducer from './authReducer';
import AuthContex from './authContex';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'

import {    
    REGISTRO_EXITOSO, REGISTRO_ERROR,
    OBTENER_USUARIO,LOGIN_ERROR,
    LOGIN_EXITOSO, CERRAR_SESION}
    from '../../types';

const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje:null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //funciones
    const registrarUsuario = async(datos) => {
        try {
            //Hacemos la paticion a la api, en data viene lo respuesta del request
            //y lo mandamos como payload para que el reducer lo guarde el localstorage
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });
            //obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            //en el response tenemos todo la info del request(con axios)
            //console.log(error.response);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR, 
                payload: alerta
            })
        }
    }

    //Retorna el usuario autenticado
    const usuarioAutenticado = async() =>{
        const token = localStorage.getItem('token');
        if(token){
            //funcion para enviar el token por header
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //Cuando el usuario inicia sesion
    const iniciarSesion = async(datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
           dispatch({
               type: LOGIN_EXITOSO,
               payload: respuesta.data
           })
           //obtener el usuario
           //obtenemos los datos datos del usuario desencriptados
           usuarioAutenticado();
        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //Cierra la sesion
    const cerrarSesion = () =>{
        dispatch({
            type:CERRAR_SESION
        })
    }
    return(
        <AuthContex.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario, 
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContex.Provider>
    )
}
export default AuthState;