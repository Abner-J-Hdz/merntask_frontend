import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto'
import ListadoProyectos from '../proyectos/ListadoProyectos'


const Sidebar = () => {
    return(
        <>
        <div id="sidebar-container" className="bg-light border-right navbar-light">
            <div className="logo border-bottom">
                <h4 className="font-weight-bold mb-0">
									<strong className="text-info mr-1">MERN</strong> 
									<span className="text-dark">Task</span>
								</h4>
            </div>
			<div className="side-scrooll">{/* div que va a tener el scroolbar */}
                <div className="navbar-nav menu list-group-flush">
                    <div className="nav-link list-group-item list-group-item-action text-muted bg-light mt-3 p-3 border-0">
                        <NuevoProyecto/>
                    </div>
                </div>
                <hr/>

                <div className="navbar-nav menu list-group-flush">
                    <h3 className="font-weight-bold text-info text-center">Tus Proyectos</h3>
                    <ListadoProyectos />
                </div>
                <hr />

                <div className="navbar-nav menu list-group-flush animated_show_fade">
                    <p className="font-weight-bold text-info text-center">Developmented by:</p>									
                    <p className=" text-center text-dark"> Engineer Abner Martinez</p>
                </div>
        	</div>  
		</div>      
        </>
    );
}

export default Sidebar;