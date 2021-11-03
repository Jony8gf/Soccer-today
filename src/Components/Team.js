import React from 'react';
import { useState, useEffect } from "react";
import {NavLink}  from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
 
const Team = ({ location }) => {

    let urlTeam = 'https://api.football-data.org/v2/teams/'+location.state.id
    let urlMatches = 'https://api.football-data.org/v2/teams/'+location.state.id+'/matches/'
    
        const [team, setTeam] = useState([])
        useEffect(() => {
            llamadaApi()   
        }, [])

        const [squad, setSquad] = useState([])
        const [previewMatches, setPreviewMatches] = useState([])
        const [nextMatches, setNextMatches] = useState([])
        const [key, setKey] = useState('equipo');

    
        const llamadaApi = async () => {
    
            const response = await fetch(urlTeam, {
              method: 'GET',
              headers: {
                  'X-Auth-Token' : '647ec294ec224c77b2784be3621f37f1'
              }
            })
          
            let json = await response.json()
            console.log(json)
            console.log(json['squad'])
            setSquad(json['squad'])
            setTeam(json)

            const responseMatches = await fetch(urlMatches, {
                method: 'GET',
                headers: {
                    'X-Auth-Token' : '647ec294ec224c77b2784be3621f37f1'
                }
              })

            json = await responseMatches.json()
            json = json['matches']
            console.log(json.filter(x => x.status === 'FINISHED'))
            console.log(json.filter(x => x.status === 'SCHEDULED'))
            setPreviewMatches(json.filter(x => x.status === 'FINISHED'))
            setNextMatches(json.filter(x => x.status === 'SCHEDULED'))
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
                            <h4 className="text-white">{team.name}</h4>
                    </div>

                    <div className="row shadow-lg">
                        
                        <div className="col">
                            <div className="row">
                                <div className="col-6 d-flex justify-content-center align-items-center">
                                    <img src={team.crestUrl} alt="" height="180px" width="180px" />
                                </div>
                                <div className="col-6 d-flex-inlines">                               
                                    <h6>Fundado: {team.founded}</h6>
                                    <h6>Estadio: {team.venue}</h6>
                                    <p>Dirección: {team.address}</p>
                                    {/* <p>País: {team.area.name}</p> */}
                                    <p>Email: {team.email}</p>
                                    <p>Teléfono: {team.phone}</p>
                                    <a href={team.website}>{team.website}</a>
                                </div>
                            </div>
                        </div>

                            {/* TABS  */}
                            <Tabs
                                id="controlled-tab-example"
                                defaultActiveKey="equipo"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3 mt-3"
                                >
                                <Tab eventKey="equipo" title="Equipo">
                                    <div className="col-12 bg-success rounded p-2 mt-1 d-flex justify-content-center">
                                        <h4 className="text-white">Equipo</h4>
                                    </div>

                                    <table className="rounded table table-striped mt-2">
                                    
                                        <thead className="tablaHead">
                                            <tr className="text-white" >
                                                <td>Nombre</td>
                                                <td>Posición</td>
                                                <td>Nacionalidad</td>
                                                <td>Edad</td>
                                            </tr>
                                        </thead>

                                        <tbody className="rounded">
                                            
                                            {squad.map(player =>  
                                                <tr key={player.id}>

                                                    {/* NOMBRE JUGADOR */}
                                                    <td> 
                                                
                                                        
                                                        <NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                                                                pathname: '/player',
                                                                                                state: { id: player.id }
                                                                                                }}><b>{player.name}</b></NavLink>
                                                
                                                    </td>

                                                    {/* POSICION */}
                                                    <td> 
                                                
                                                        {player.position}
                                                
                                                    </td>

                                                    {/* Nacionalidad */}
                                                    <td>
                                                
                                                        {player.nationality}
                                                
                                                    </td>

                                                    

                                                    {/* EDAD */}
                                                    <td> 
                                                
                                                        {calcularEdad(player.dateOfBirth.slice(0, 10))}
                                                
                                                    </td>

                                                </tr>
                                                )}
                                        </tbody>    
                                    </table>
                                </Tab>
                                <Tab eventKey="proximosPartidos" title="Proximos Partidos">
                                    <div className="col-12 bg-success rounded p-2 mt-1 d-flex justify-content-center">
                                        <h4 className="text-white">Proximos partidos</h4>
                                    </div>

                                    {nextMatches.map(match => 

                                        <div key={match.id}>
                                            
                                            <div className="container mb-3">
                                            <div className="row shadow rounded">
                                                <div className="col-12 d-flex justify-content-center p-2 m-0 liga-nav">
                                                    {/* <span className="text-dark mx-3"><b>   </b></span> */}

                                                    <NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                                                                pathname: '/clasificaciones',
                                                                                                state: { id: match.competition.id }
                                                                                                }}>{match.competition.name}</NavLink>
                                                    <img className="rounded-circle" src={match.competition.area.ensignUrl} alt="" height="30px" width="30px" />
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
                                </Tab>
                                <Tab eventKey="resultados" title="Resultados">
                                    <div className="col-12 bg-success rounded p-2 mt-1 d-flex justify-content-center">
                                        <h4 className="text-white">Resultados últimos partidos</h4>
                                    </div>

                                    {previewMatches.map(match =>             
                                        <div key={match.id}>
                                            
                                            <div className="container mb-3">
                                            <div className="row shadow rounded">
                                                <div className="col-12 d-flex justify-content-center p-2 m-0 liga-nav">
                                                    {/* <span className="text-dark mx-3"><b>   </b></span> */}

                                                    <NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                                                                pathname: '/clasificaciones',
                                                                                                state: { id: match.competition.id }
                                                                                                }}>{match.competition.name}</NavLink>
                                                    <img className="rounded-circle" src={match.competition.area.ensignUrl} alt="" height="30px" width="30px" />
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
                                        ).reverse()}
                                </Tab>
                            </Tabs>

                                    
                        </div>
                 </div>
            </div>
        );
    }
 
export default Team