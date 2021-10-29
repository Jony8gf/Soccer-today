import React from 'react';
import { useState, useEffect } from "react";


 
const Clasification = ({ location }) => {

let url = 'https://api.football-data.org/v2/competitions/'+location.state.id+'/standings'

    const [competitions, setcompetitions] = useState([])
    useEffect(() => {
        llamadaApi()   
    }, [])

    const llamadaApi = async () => {

        const response = await fetch(url, {
          method: 'GET',
          headers: {
              'X-Auth-Token' : '647ec294ec224c77b2784be3621f37f1'
          }
        })
      
        let json = await response.json()
        console.log(json)
        json = json['standings'][0]
        console.log(json['table'])
        setcompetitions(json['table'])
    }

    //llamadaApi()

    return (
        <div className="container">
            <div className="container mb-2 rounded">
                <div className="row shadow-lg">
                    <table className="rounded table table-striped">
                        
                        <thead className="tablaHead">
                            <tr className="text-white" >
                                <td>POS</td>
                                <td></td>
                                <td>EQUIPO</td>
                                <td>PJ</td>
                                <td>PG</td>
                                <td>PE</td>
                                <td>PD</td>
                                <td>GF</td>
                                <td>GC</td>
                                <td>GD</td>
                                <td>PTS</td>
                            </tr>
                        </thead>

                        <tbody className="rounded">
                            {competitions.map(comp => 
                                <tr key={comp.team.name}>
                                    {/* POSICION */}
                                    <td> 
                                
                                        <b>{comp.position}</b>
                                
                                    </td>

                                    {/* IMAGEN EQUIPO */}
                                    <td>
                                
                                        <img src={comp.team.crestUrl} alt="" height="30px" width="30px" />
                                
                                    </td>

                                    {/* NOMBRE EQUIPO */}
                                    <td> 
                                
                                        <b>{comp.team.name}</b>
                                
                                    </td>

                                    {/* PARTIDO JUGADOS */}
                                    <td> 
                                
                                        {comp.playedGames}
                                
                                    </td>

                                    {/* PARTIDO GANADOS */}
                                    <td> 
                                
                                        {comp.won}
                                
                                    </td>

                                     {/* PARTIDO EMPATADOS */}
                                    <td> 
                                
                                        {comp.draw}
                                
                                    </td>

                                     {/* PARTIDO PERDIDOS */}
                                     <td> 
                                
                                        {comp.lost}
                        
                                    </td>

                                     {/* GOLES A FAVOR */}
                                     <td> 
                                
                                        {comp.goalsFor}
                        
                                    </td>

                                    {/* GOLES EN CONTRA */}
                                    <td> 
                                
                                        {comp.goalsAgainst}
                
                                    </td>

                                    {/* GOLES DIFERENCIA*/}
                                    <td> 
                                
                                        {comp.goalDifference}
                
                                    </td>

                                    {/* PUNTOS */}
                                    <td> 
                                
                                        <b>{comp.points}</b>
                
                                    </td>

                                </tr>
                                )}
                            </tbody>
                        
                    </table>
                </div>
             </div>
        </div>
    );
}
 
export default Clasification