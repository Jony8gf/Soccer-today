import { useState, useEffect } from "react";
import Header from './Components/Header'

const App = () => {

  let url = 'https://api.football-data.org/v2/matches'

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  var dateYear = hoy.toISOString()
  dateYear = dateYear.slice(0, 4);
  var dateMouth = hoy.toISOString()
  dateMouth = dateMouth.slice(5, 7);
  var dateDay = hoy.toISOString()
  dateDay = dateDay.slice(8, 10);
  var jsonCount = null
  var jsonMatches = null

  url = 'https://api.football-data.org/v2/matches?dateFrom='+dateYear+'-'+dateMouth+'-'+dateDay+'&dateTo='+dateYear+'-'+dateMouth+'-'+dateDay
  //console.log(dateYear + '-' + dateMouth + '-' + dateDay )

  const sumarDia = () =>{
    dateDay++
    url = 'https://api.football-data.org/v2/matches?dateFrom='+dateYear+'-'+dateMouth+'-'+dateDay+'&dateTo='+dateYear+'-'+dateMouth+'-'+dateDay
    llamadaApi()
    console.log(dateDay)
  }
  
  const restarDia = () =>{
    dateDay--
    url = 'https://api.football-data.org/v2/matches?dateFrom='+dateYear+'-'+dateMouth+'-'+dateDay+'&dateTo='+dateYear+'-'+dateMouth+'-'+dateDay
    llamadaApi()
    console.log(dateDay)
  }

const llamadaApi = async () => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
        'X-Auth-Token' : '647ec294ec224c77b2784be3621f37f1'
    }
  })

  const json = await response.json()
  console.log(json)

  //jsonMatches = json['matches']
	// jsonCount = json['count']
  //console.log(jsonMatches)
  // console.log(jsonCount)

  setMatches(json['matches'])
}

  const [matches, setMatches] = useState([])
  useEffect(() => {
    llamadaApi()   
  }, [dateYear, dateMouth, dateDay])

  return (
      <div className="container">
        <Header />

        <div className="container mb-2 rounded">
          <div className="row shadow-lg rounded">
            <div className="col-4 d-flex justify-content-end">
                <button className="btn btn-success" onClick={restarDia}> &lt; </button>
            </div>
            <div className="col-4 d-flex justify-content-center">
                Today
            </div>
            <div className="col-4 d-flex justify-content-start">
                <button className="btn btn-success" onClick={sumarDia}> &gt; </button>
            </div>
          </div>
        </div>
        

        {matches.map(match => 
          <div key={match.id}>
            <div className="container mb-3">
              <div className="row shadow rounded">
                <div className="col-12 d-flex justify-content-center p-2 m-0 liga-nav">
                    <span className="text-dark mx-3"><b> {match.competition.name} </b></span>
                    <img className="rounded-circle" src={match.competition.area.ensignUrl} alt="" height="30px" width="30px" />
                </div>
                <div className="col-5 d-flex justify-content-end p-4 mb-2">
                  <span>{match.homeTeam.name}</span>
                </div>
                <div className="col-2 d-flex justify-content-center p-4 mb-2">
                  <span>{match.score.fullTime.homeTeam != null ?
                         <span>{match.homeTeam.name }</span> - <span>{match.homeTeam.name}</span> :
                          match.utcDate.slice(11, -4) }
                  </span>
                </div>
                <div className="col-5 d-flex justify-content-start p-4 mb-2">
                  <span>{match.awayTeam.name}</span>
                </div>

              </div>
            </div>
            
          </div>
          )}

       </div>
  );
}

export default App
