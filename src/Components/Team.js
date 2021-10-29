import React from 'react';
import { useState, useEffect } from "react";
 
const Team = ({ location }) => {

    let url = 'https://api.football-data.org/v2/teams/'+location.state.id
    
        const [team, setTeam] = useState([])
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
            //json = json['standings'][0]
            // console.log(json['table'])
            //setTeam(json)
        }

        // llamadaApi()
    
        return (
            <div className="container">
                <div className="container mb-2 rounded">
                    <div className="row shadow-lg">
                        <p>Team: {location.state.id}</p>
                    </div>
                 </div>
            </div>
        );
    }
 
export default Team;