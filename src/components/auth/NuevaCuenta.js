import React, { useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import alertaContex from '../../context/alertas/alertasContex';
import AuthContex from '../../context/autenticacion/authContex';

const NuevaCuenta = (props) => {

    //extaer valores
    const AlertaContex =useContext(alertaContex);
    const { alerta, mostrarAlerta } = AlertaContex;

    const authContex = useContext(AuthContex);
    const { mensaje, autenticado,  registrarUsuario } = authContex;

    //En caso de que el usuario se haya autenticado o registrado 
    useEffect(() =>{
        if (autenticado) {
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria );
        }
        // eslint-disable-next-line
    },[mensaje, autenticado, props.history])


    //state para iniciar sesion
    //user, setUser
    const [usuario, guardarUsuario] = useState({
        nombre: '', 
        email: '',
        password: '',
        confirmar: ''
    });
    //extraer propiedades de usuario
    const { nombre, email, password, confirmar} = usuario;

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
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' 
        || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alert-warning');
            return
        }
        //password minimo6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe de ser de almenos 6 caracteres', 'alert-warning');
            return;
        }
        //pasword iguales
        if(password !== confirmar){
            mostrarAlerta('Los password no son iguales', 'alert-warning');
            return;       
        }
        //pasar al action, function en el  reducer
        //console.log('Registrando...');
        registrarUsuario({
            nombre,
            email,
            password
        });
    }

    return(
        <div className="form-div bg-light" id="form-usuario">

            <div className="p-2 my-form border mt-5 mb-5 bg-white">
                <h1 className="text-dark p-2">Crear nueva cuenta</h1>

                <form onSubmit={onSubmit}>
                    {alerta? (<div className={` alert alerta ${alerta.categoria}`} role="alert">{alerta.msg}</div>):
                null}                    
                    <div className="form-group">
                        <label htmlFor="email" className="label-form text-dark">Nombre</label>
                        <input 
                            className="form-control form-control-sm"
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Tu nombre"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="text-dark label-form">Email</label>
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
                        <label htmlFor="password" className="label-form">Password</label>
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

                    <div className="form-group" >
                        <label htmlFor="password" className="label-form">Repetir Password</label>
                        <input 
                            className="form-control form-control-sm"
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Confirma password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-sm bg-primary text-white btn-block"
                        >
                            Registrarme
                        </button>
                    </div>
                </form>
                <Link to={'/'} className="text-decoration-none">
                    <h5 className="text-info mt-4">Iniciar Sesión</h5>
                </Link>
            </div>
        </div>
    );
}

export default NuevaCuenta;