import React from 'react';
import { useState, useEffect } from "react";
import {NavLink}  from 'react-router-dom';


 
const Clasification = ({ location }) => {

let url = 'https://api.football-data.org/v2/competitions/'+location.state.id+'/standings'
let leng = 0


    const [competitions, setcompetitions] = useState([])
    const [tables, setTables] = useState([])
    useEffect(() => {
        llamadaApi()   
    }, [])

    const llamadaApi = async () => {

        var auxTable = []
        var ttTable = []

        const response = await fetch(url, {
          method: 'GET',
          headers: {
              'X-Auth-Token' : '647ec294ec224c77b2784be3621f37f1'
          }
        })
      
        let json= await response.json()
        //console.log(json)
        
        leng = json['standings']['length']
        console.log(leng)
        auxTable = json['standings']
        console.log(auxTable)

        if(leng > 1){
            leng-- 

            auxTable.forEach(function(elemento, indice, auxTable) {
                console.log(elemento, indice);
                ttTable.push(elemento['table'])
            })
            ttTable.shift()
            ttTable.shift()
            console.log(ttTable)
            
            setTables(ttTable)
            console.log(tables)

        }else{
            json = json['standings'][0]
            console.log(json['table'])
            setcompetitions(json['table'])
            console.log(competitions)
        }
        
    }

    //llamadaApi()

    return (
        <div className="container">
            <div className="container mb-2 rounded">
                <div className="row shadow-lg">

                    {tables.length > 1 ? 

                    tables.map(comp =>
                            <table className="rounded my-3">
                                                
                            <thead className="rounded tablaHead">
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
                                 

                                    {comp.map(x => 
                                        
                                        <tr>
                                        {/* POSICION */}
                                        <td> 
                                    
                                            <b>{x.position}</b>
                                    
                                        </td>

                                        {/* IMAGEN EQUIPO */}
                                        <td>
                                            <NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                                    pathname: '/team',
                                                                    state: { id: x.team.id }
                                                                    }}><img src={x.team.crestUrl} alt="" height="30px" width="30px" />
                                            </NavLink>
                                            
                                    
                                        </td>

                                        {/* NOMBRE EQUIPO */}
                                        <td> 
                                            <NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                                    pathname: '/team',
                                                                    state: { id: x.team.id }
                                                                    }}><b>{x.team.name}</b></NavLink>
                                    
                                        </td>

                                        {/* PARTIDO JUGADOS */}
                                        <td> 
                                    
                                            {x.playedGames}
                                    
                                        </td>

                                        {/* PARTIDO GANADOS */}
                                        <td> 
                                    
                                            {x.won}
                                    
                                        </td>

                                        {/* PARTIDO EMPATADOS */}
                                        <td> 
                                    
                                            {x.draw}
                                    
                                        </td>

                                        {/* PARTIDO PERDIDOS */}
                                        <td> 
                                    
                                            {x.lost}
                            
                                        </td>

                                        {/* GOLES A FAVOR */}
                                        <td> 
                                    
                                            {x.goalsFor}
                            
                                        </td>

                                        {/* GOLES EN CONTRA */}
                                        <td> 
                                    
                                            {x.goalsAgainst}
                    
                                        </td>

                                        {/* GOLES DIFERENCIA*/}
                                        <td> 
                                    
                                            {x.goalDifference}
                    
                                        </td>

                                        {/* PUNTOS */}
                                        <td> 
                                    
                                            <b>{x.points}</b>
                    
                                        </td>

                                    </tr>
                                        
                                        
                                        )}
                                    
                                    
                            </tbody>
                        </table>
                        )
                        
                        
                    : <table className="rounded">
                        
                    <thead className="rounded tablaHead">
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
                                    <NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                            pathname: '/team',
                                                            state: { id: comp.team.id }
                                                            }}><img src={comp.team.crestUrl} alt="" height="30px" width="30px" />
                                     </NavLink>
                                    
                            
                                </td>

                                {/* NOMBRE EQUIPO */}
                                <td> 
                                    <NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                            pathname: '/team',
                                                            state: { id: comp.team.id }
                                                            }}><b>{comp.team.name}</b></NavLink>
                            
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
                    
                </table>}
                    
                </div>
             </div>
        </div>
    );
}
 
export default Clasification