import { useState, useEffect } from "react";
import Header from './Components/Header'
import EquipoImage from './Components/EquipoImage'

import DatePicker from "react-datepicker";

// import required css from library
import "react-datepicker/dist/react-datepicker.css";
//https://codesource.io/complete-react-datepicker-tutorial-with-examples/

let url = 'https://api.football-data.org/v2/matches'

const tiempoTranscurrido = Date.now();
let hoy = new Date(tiempoTranscurrido);
let dateYear = hoy.toISOString()
dateYear = dateYear.slice(0, 4);
let dateMouth = hoy.toISOString()
dateMouth = dateMouth.slice(5, 7);
let dateDay = hoy.toISOString()
dateDay = dateDay.slice(8, 10);

const App = () => {

  url = 'https://api.football-data.org/v2/matches?dateFrom='+dateYear+'-'+dateMouth+'-'+dateDay+'&dateTo='+dateYear+'-'+dateMouth+'-'+dateDay
  //console.log(dateYear + '-' + dateMouth + '-' + dateDay )

  const [matches, setMatches] = useState([])
  useEffect(() => {
    llamadaApi()   
  }, [])

  const [startDate, setStartDate] = useState(hoy)
  
  const sumarDia = () =>{
    hoy.setHours(+24)
    console.log(hoy)
    dateDay++
    url = 'https://api.football-data.org/v2/matches?dateFrom='+dateYear+'-'+dateMouth+'-'+dateDay+'&dateTo='+dateYear+'-'+dateMouth+'-'+dateDay
    console.log(dateDay)
    llamadaApi()
  }
  
  const restarDia = () =>{ 
    hoy.setHours(-24)
    console.log(hoy)
    dateDay--
    url = 'https://api.football-data.org/v2/matches?dateFrom='+dateYear+'-'+dateMouth+'-'+dateDay+'&dateTo='+dateYear+'-'+dateMouth+'-'+dateDay
    console.log(dateDay)
    llamadaApi()
  }

  const cambiarFecha = () =>{
    let dateChange = document.getElementById('datePicker').value
    dateYear = dateChange.slice(0, 4);
    dateMouth = dateChange.slice(5, 7);
    dateDay = dateChange.slice(8, 10);
    //console.log(dateChange)
    console.log(dateYear + '-' + dateMouth + '-' + dateDay )
    url = 'https://api.football-data.org/v2/matches?dateFrom='+dateYear+'-'+dateMouth+'-'+dateDay+'&dateTo='+dateYear+'-'+dateMouth+'-'+dateDay
    llamadaApi()
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
  setMatches(json['matches'])

}

  return (
      <div className="container">
        <Header />

        <div className="container mb-2 rounded">
          <div className="row shadow-lg rounded">

            {/* Restar Dia Botton */}
            <div className="col-4 d-flex justify-content-end">
                <button className="btn btn-success" onClick={restarDia}> &lt; </button>
            </div>

            {/* DataPicker (Today) */}
            <div className="col-4 d-flex justify-content-center flex-column">
                <DatePicker id="datePicker"
                   className="form-control text-center"
                    selected={startDate} 
                    onChange={date => setStartDate(date)}
                    onCalendarClose={cambiarFecha}
                    dateFormat="yyyy-MM-dd"
                  />
                
            </div>

            {/* Sumar Dia Botton */}
            <div className="col-4 d-flex justify-content-start">
                <button className="btn btn-success" onClick={sumarDia}>  &gt; </button>
            </div>
          </div>
        </div>
        

        {/* Partidos del Dia */}
        {matches.map(match => 
          <div key={match.id}>
            <div className="container mb-3">
              <div className="row shadow rounded">
                <div className="col-12 d-flex justify-content-center p-2 m-0 liga-nav">
                    <span className="text-dark mx-3"><b> {match.competition.name} </b></span>
                    <img className="rounded-circle" src={match.competition.area.ensignUrl} alt="" height="30px" width="30px" />
                </div>
                <div className="col-5 d-flex justify-content-end p-4 mb-2">
                  {/* <EquipoImage /> */}
                  <span className="mx-2">{match.homeTeam.name}</span>
                </div>
                <div className="col-2 d-flex justify-content-center p-4 mb-2">
                  {match.score.fullTime.homeTeam != null ?
                          <span> {match.score.fullTime.homeTeam} &#45; {match.score.fullTime.awayTeam} </span>:
                          <span> {match.utcDate.slice(11, -4)} </span> }
                  
                </div>
                <div className="col-5 d-flex justify-content-start p-4 mb-2">
                  <span className="mx-2">{match.awayTeam.name}</span>
                  {/* <EquipoImage /> */}
                </div>

              </div>
            </div>
            
          </div>
          )}

       </div>
  );
}

export default App
