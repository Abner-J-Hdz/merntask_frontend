import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/autenticacion/authContex";
import TareaContext from "../../context/tareas/tareaContex";
import ProyectoContext from "../../context/proyectos/proyectoContext";

const Barra = ({ menuClose }) => {
  //extraer la informacion de authcontext
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  const tareaContext = useContext(TareaContext);
  const { vaciarTareas } = tareaContext;

  const proyectoContext = useContext(ProyectoContext);
  const { vaciarProyecto } = proyectoContext;

  //el efect es que para que detecteun cambio, ya que no lo va a ejecutar a la primera
  //sino que tardara un poco y depues pondra el nombre
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  const LogOut = () => {
    vaciarTareas();
    vaciarProyecto();
    cerrarSesion();
  };

 /* const menuClose = () => {
    let HideMenu = document.getElementById('content-wrapper');
    HideMenu.classList.toggle('toggled')
  }
*/

  return (
    <>
      <nav
        style={{ height: "57px" }}
        className="navbar navbar-expand-lg navbar-light bg-light border-bottom "
      >
        <div className="my-list-item">
          <div>
            <button
              onClick={() => menuClose()}
              type="button"
              className="btn btn-default text-dark"
              id="menu-toggle"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        
          <div id="nav-user" className="nav-name animated_show_fade">
            <p className="nav-link text-dark mb-0">
              {usuario ? (<strong className="text-dark">{usuario.nombre}</strong>) : null}
            </p>

            <button
              onClick={LogOut}
              className="btn btn-sm btn-light text-dark"
            >
              Cerrar Sesion
            </button>
          </div>          
        </div>


        {/*<button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>*/}
      </nav>
    </>
  );
};

export default Barra;
/*
        <div className="" id="">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <p className="nav-link text-dark mb-0">
                {usuario ? `Hola ${usuario.nombre}` : null}
              </p>
            </li>
            <li className="nav-item dropdown">
              <button
                onClick={LogOut}
                className="btn-sm btn-link border-0 nav-link text-dark"
              >
                Cerrar Sesion
              </button>
            </li>
          </ul>
        </div>

*/