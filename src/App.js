import React from 'react';
import './App.css';

import Navigation from "./Components/Navigation"

export default class App extends React.Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div>      
        <Navigation/>
        <h1>Travel Planner</h1>
      </div>
    )
  }
}
