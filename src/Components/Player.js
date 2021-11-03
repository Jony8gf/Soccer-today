import React from 'react';
import { useState, useEffect } from "react";
import {NavLink}  from 'react-router-dom';


 
const Player = ({ location }) => {

let url = 'https://api.football-data.org/v2/players/'+location.state.id+'/matches'

    const [matches, setMatches] = useState([])
    const [player, setPlayer] = useState([])
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
        setPlayer(json['player'])
        console.log(json['matches'])
        setMatches(json['matches'])
    }

    const calcularEdad = (fechaNacimiento) => { 

        var hoy = new Date();
        var cumpleanos = new Date(fechaNacimiento);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }

    return (
        <div className="container">
            <div className="container mb-2 rounded">
                    <div className="col bg-success rounded p-2 my-3 d-flex justify-content-center">
                            <h4 className="text-white">{player.name}</h4>
                    </div>

                    <div className="col rounded p-2 my-3 shadow-lg">
                        <div className="row">
                            <div className="col-12 d-flex-inline justify-content-center align-items-center">                               
                                <h6>Nacionalidad: {player.nationality}</h6>
                                <h6>Posicion: {player.position}</h6>
                                <span>Fecha de Nacimiento: {player.dateOfBirth}  ({calcularEdad(player.dateOfBirth)}) años</span>
                            </div>
                        </div>
                    </div>
                    

                    <div className="col-12 bg-success rounded p-2 mt-1 d-flex justify-content-center">
                                        <h4 className="text-white">Últimos partidos</h4>
                                    </div>

                                    {matches.map(match =>             
                                        <div key={match.id}>
                                            
                                            <div className="container mb-3">
                                            <div className="row shadow rounded">
                                                <div className="col-12 d-flex justify-content-center p-2 m-0 liga-nav">
                                                    {/* <span className="text-dark mx-3"><b>   </b></span> */}

                                                    <NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                                                                pathname: '/clasificaciones',
                                                                                                state: { id: match.competition.id }
                                                                                                }}>{match.competition.name}</NavLink>
                                                    {/* <img className="rounded-circle" src={match.competition.area.ensignUrl} alt="" height="30px" width="30px" /> */}
                                                </div>
                                                <div className="col-5 d-flex justify-content-end p-4 mb-2">
                                                {/* <EquipoImage /> */}
                                                <span className="mx-2"><NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                                                                pathname: '/team',
                                                                                                state: { id: match.homeTeam.id }
                                                                                                }}>{match.homeTeam.name}</NavLink></span>
                                                </div>
                                                <div className="col-2 d-flex justify-content-center p-4 mb-2">
                                                {match.score.fullTime.homeTeam != null ?
                                                        <span> {match.score.fullTime.homeTeam} &#45; {match.score.fullTime.awayTeam} </span>:
                                                        <span> {match.utcDate.slice(11, -4)} </span> }
                                                
                                                </div>
                                                <div className="col-5 d-flex justify-content-start p-4 mb-2">
                                                <span className="mx-2"><NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                                                                pathname: '/team',
                                                                                                state: { id: match.awayTeam.id }
                                                                                                }}>{match.awayTeam.name}</NavLink></span>
                                                {/* <EquipoImage /> */}
                                                </div>

                                            </div>
                                            </div>
                                            
                                        </div>
                                        )}
            </div>
        </div>
    );
}
 
export default Player