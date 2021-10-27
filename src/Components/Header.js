import { Component } from 'react';

class Header extends Component{
 render(){
    return(
        
            <div className="row mb-3 mt-3">
                <div className="col">
                    <ul className="nav justify-content-center bg-success shadow rounded">
                        <li className="nav-item">
                            <h2 className="text-white">Soccer Today</h2>
                        </li>
                    </ul>
                </div>
            </div>
        
        
    )
 }    
}

export default Header