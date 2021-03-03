import React, {useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
// Obtener el state del formulario
//definimos una variable, la igualamos a use contex y le pasamos el contex
//que queremos utilizar, 
//esta linea de codigo basta para poder utilizar el estate de proyecto
//sin necesidad de pasarlo por props
    const proyectosContext = useContext(proyectoContext);
//hacemos destructuring para obtener la propiedad formulario del estado
    const { 
        formulario, errorformulario , 
        mostrarFormulario, agregarProyecto, 
        mostrarError } = proyectosContext;

    //state del proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const { nombre } = proyecto;

    /**Lee los cambio de los input del formulario */
    const onChangeProyecto = (e) => {
        guardarProyecto({
            ...proyecto,
            [e.target.id] : e.target.value
        })
    }

    const onSubmitProyecto = (e) => {
        e.preventDefault();
        //console.log("submit ... validando proyecto");
        //Validar el proyecto
        if (nombre === '') {
            mostrarError();
            return;
        }
        //agregar el state del formulario al state global,
        agregarProyecto(proyecto)
        //reiniciar el form
        //seteamos el state del formulario
        guardarProyecto({
            nombre: ''
        })
        //el formulario se escondera cuando el state del formulario
        //vaya al reducer al actualizar el estado global de de proyectos
        //ya que ese case del switch se cambiara el estado del formulario
        //a false
    }
    //Mostrar formularios cambia a true el estado
    const OnClickFormulario = () => {
        mostrarFormulario();
    }
    return(
        <>
            <button
             title="Crea un Nuevo Proyecto"
            type="button"
            className="btn bg-primary  btn-block text-white"
            onClick={OnClickFormulario}
            >
               Nuevo Proyecto
            </button>
           {
               formulario 
               ?
               (
                <form className="pt-1 mt-1" onSubmit={onSubmitProyecto}>
                    <input
                        type="text"
                        className="form-control form-control-sm mb-2"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value = {nombre}
                        id="nombre"
                        onChange={onChangeProyecto}
                    />
                     {errorformulario ? 
                     <p className="text-danger text-center text-md font-weight-bold pt-1">El nombre del proyecto es obligatorio</p> 
                     : null
                     }
                    <button 
                        type="submit"
                        className="btn btn-sm bg-dark btn-block text-white"
                    >Agregar Proyecto</button>
                </form>
               ):
               (null)
           }
        </>
    );
}

export default NuevoProyecto;