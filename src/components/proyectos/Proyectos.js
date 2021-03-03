import React, { useContext, useEffect} from 'react';
import Sidebar from './../layout/Sidebar';
import Barra from './../layout/Barra';
import FormTarea from './../tareas/FormTarea';
import ListadoTareas from './../tareas/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContex';

const Proyectos = () => {
    //extraer la informacion de authcontext
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;
    //esto hará que no se pierda el usuario autenticado
    //cada vez que recargue la pagina
    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[])

    const menuClose = () => {
        let HideMenu = document.getElementById('content-wrapper');
        HideMenu.classList.toggle('toggled')
    }

    return(
        <>
            <div className="d-flex" id="content-wrapper">
                <Sidebar /> 
                <div id="page-content-wrapper" className="w-100 bg-light-blue">
                    <Barra menuClose={menuClose} />

                    <div id="content" className="container-fluid p-3">
                        <FormTarea />
                        <div className="contenedor-tareas">
                            <ListadoTareas />
                        </div>                    
                        
                    </div>

                </div>            
            </div>
        </>
    );
}

export default Proyectos;