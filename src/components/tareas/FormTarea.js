import React, {useContext, useState, useEffect} from 'react';
import proyectoContex from '../../context/proyectos/proyectoContext'
import tareaContex from '../../context/tareas/tareaContex'

const FormTarea = () => {
    //extraer si un proyecto esta activo        
    const proyectosContex = useContext(proyectoContex);
    const { proyecto} =  proyectosContex;

    const tareasContex = useContext(tareaContex);
    const { tareaseleccionada, errortarea, 
        agregarTarea, validarTarea, actualizarTarea, 
        limpiarTarea } = tareasContex;

    //Effect que detecta si hay una tarea selecionada
    useEffect(() => {
       if (tareaseleccionada !== null) {
        guardarTarea(tareaseleccionada)
       }else{
           guardarTarea({
               nombre: ''
           })
       }
    }, [tareaseleccionada])

    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: '',
    })

    //extraer el nombre de la tarea
    const { nombre } = tarea;
    const btn_form = document.getElementById('btn_nombre');
    //Si no hay proyecto selecionado, dado que si array esta vacio
    //y si aplica destructuring nos dara un error
    if(!proyecto) return null 
    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //Leer los valores del formulario
    const handleChange = (e) =>{
        guardarTarea({
           ...tarea,
           [e.target.id] : e.target.value
        })
    }

    const onSubmit = (e) =>{
        btn_form.disabled = true;
        e.preventDefault();
        //console.log('validando...');
        //validar
        if(nombre.trim()===''){
            validarTarea();
            btn_form.disabled = false;
            return;//para que no se ejecute lo que sigue de codigo
        } 
        //Verificar si es una tarea nueva o es edicion
        if (tareaseleccionada===null) {
            tarea.proyecto = proyectoActual._id;
            
            //agregar tarea
            agregarTarea(tarea);            
        }else{
            //actualiza tarea 
            actualizarTarea(tarea);
            //elimina tarea seleccionada
            limpiarTarea();
        }

        //obtener tareas y filtrarlas
        //obtenerTareas(proyectoActual._id);//lo actualizo en el state cuando actualia la tarea
        //habilitamos el boton
        btn_form.disabled = false;
        //seteamo el state del formulario
        guardarTarea({
            nombre:''
        })
    }

    return(
        <div className="p-3 bg-secondary formulario">
            <form onSubmit={onSubmit}>
                <div className="cntenedor-input">
                    <input 
                        type="text" 
                        className="form-control " 
                        placeholder="Nombre Tarea"
                        id="nombre"     
                        name="nombre"   
                        value={nombre}
                        onChange={handleChange}
                    />
                     {errortarea ? 
                     <p className="text-danger bg-white br-5 text-center text-md font-weight-bold pt-3">El nombre de la tarea es obligatorio</p> 
                     : null
                     }                    
                </div>

                <div className="contenedor-input mt-2">
                    <button 
                        type="submit" 
                        className="btn bg-dark btn-block text-white" 
                        placeholder="Nombre Tarea"
                        id="btn_nombre"
                    >{tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}</button>
                </div>
            </form>
        </div>
    );
}
export default FormTarea;