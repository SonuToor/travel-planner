import React from 'react';
import './App.css';

import Navigation from "./Components/Navigation"


export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      loggedIn : false,
      userName : null
    }
  }
  render() {
    return (
      <div>      
        <Navigation loggedIn={this.state.loggedIn}/>
        <h1>Travel Planner</h1>
      </div>
    )
  }
}
