import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Home from './Components/Home';
import Clasification from './Components/Clasification';
import Team from './Components/Team';
import Error from './Components/Error';
import Navigation from './Components/Navigation';
import Player from './Components/Player';
import Match from './Components/SingleMatch';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/clasificaciones" component={Clasification}/>
             <Route path="/team" component={Team}/>
             <Route path="/player" component={Player}/>
             <Route path="/match" component={Match}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;