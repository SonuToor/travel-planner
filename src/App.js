import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import Navigation from "./Components/Navigation"
import Landing from './Components/Landing'
import Login from './Components/Login'
import React from 'react';

 
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Quicksand', "sans-serif"]
  }
}); 

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      loggedIn : true,
      userName : null
    }
  }
  render() {
    return (
        <Container > 
          <Navigation loggedIn={this.state.loggedIn} theme={theme}/>
          <Router>
            <div>
              <Route path="/" component={Landing}/>
              <Route path="/login" component={Login}/>
            </div>
          </Router>

        </Container>
    )
  }
}
