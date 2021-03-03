import React, {useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContex';
//sfce para crear un const

//Esto es un Hide orden Component
const RutaPrivada = ({component: Component, ...props}) => {
    const authContext = useContext(AuthContext);
    const { autenticado,cargando, usuarioAutenticado } = authContext;

    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[]);
    //si no esta cargando y no está autenticado
    return ( 
        
        <Route {...props } render={ props => !autenticado && !cargando ?(
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) } />
     );
}
 //sfce para crear un const
export default RutaPrivada;