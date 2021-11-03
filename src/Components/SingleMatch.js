import React from 'react';
import { useState, useEffect } from "react";
// import {NavLink}  from 'react-router-dom';
// import Lottie from 'react-lottie-player'
// import reactLogo from "../Animations/football";
 
const SigleMatch = ({ location }) => {

    let url = 'https://api.football-data.org/v2/matches/'+location.state.id
    
    const llamadaApi = async () => {

        const response = await fetch(url, {
          method: 'GET',
          headers: {
              'X-Auth-Token' : '647ec294ec224c77b2784be3621f37f1'
          }
        })
      
        let json = await response.json()
        console.log(json)
        console.log(json['match'])
        console.log(json['head2head'])
        setSingleMatch(json['match'])
        setHeadMatch(json['head2head'])
    }

    const [singleMatch, setSingleMatch] = useState([])
    useEffect(() => {
        llamadaApi()
    }, [])

    const [headMatch, setHeadMatch] = useState([])

        return (
            <div className="container">
                <div className="container mb-2 rounded">
                    <div className="row shadow-lg rounded">
                        
                        <div className="col-6 d-flex-inlines">                               
                                    <h6>Id partido: {singleMatch.id}</h6>
                                    <p>Local: {singleMatch.homeTeam.name}</p>
                                    <p>Visitante: {singleMatch.awayTeam.name}</p>
                        
                        </div>
                          
                    </div>    
                </div>
            </div>    
        
        )
}

export default SigleMatch