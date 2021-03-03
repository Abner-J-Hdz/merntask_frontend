import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertaContex from '../../context/alertas/alertasContex';
import AuthContex from '../../context/autenticacion/authContex';

const Login = (props) => {

    //extaer valores
    const AlertaContex =useContext(alertaContex);
    const { alerta, mostrarAlerta } = AlertaContex;
    
    const authContex = useContext(AuthContex);
    const { mensaje, autenticado,  iniciarSesion } = authContex;

    //En caso de que el el password o usuario este mal
    //o se un 
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria );
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado,props.history])

    //state para iniciar sesion
    //user, setUser
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });
    //extraer propiedades de usuario
    const { email, password} = usuario;

    //cuando el usuario escribe en lo inputs
    const onChange = (e) => {
        guardarUsuario({
            ...usuario, 
            [e.target.id] : e.target.value,
        })
    }   

    //Cuando el usuario haga login
    const onSubmit = (e) =>{
        e.preventDefault();
        
        //validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return
        }
        //pasar al action, function en el  reducer
        iniciarSesion({email, password});
        //console.log('Iniciando sesion');
    }

    return(
        
        <div className="form-div bg-light" id="form-usuario">
            
            <div className="p-2 my-form border mt-5 mb-5 bg-white">
                <h1 className="text-dark p-2">Iniciar Sesion</h1>

                <form onSubmit={onSubmit}>
                {alerta? (<div className={`alert alert-warning alerta ${alerta.categoria}` } role="alert" >{alerta.msg}</div>):
             null}
                    <div className="form-group">
                        <label htmlFor="email" className="label-form text-dark">Email</label>
                        <input 
                            className="form-control form-control-sm"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Tu email"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="label-form  text-dark">Password</label>
                        <input 
                            className="form-control form-control-sm"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Tu password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-sm bg-primary text-white btn-block"                       
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="text-decoration-none">
                    <h5 className="text-info mt-4">Obtener Cuenta</h5>
                </Link>
            </div>
        </div>
    );
}

export default Login;