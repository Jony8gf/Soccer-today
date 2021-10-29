import React from 'react';
 
import {NavLink}  from 'react-router-dom';
 
const Navigation = () => {
    return (

        <div className="container my-2">
            <nav className="navbar navbar-expand-lg navbar-success bg-success rounded">
                <div className="container-fluid justify-content-center ">
                    <NavLink className="text-decoration-none " to="/"><h3 className="text-white mx-3">Soccer Today</h3></NavLink>

                    {/* <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
                            <li className="nav-item">
                                <NavLink  className="nav-link" to={{
                                                                pathname: '/clasificaciones',
                                                                state: { id: '1' }
                                                                }}>Clasificaciones</NavLink> 
                            </li>
                        </ul>
                    </div> */}
                </div>
            </nav>
        </div>
        
    );
}
 
export default Navigation;