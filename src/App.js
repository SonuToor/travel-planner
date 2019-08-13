import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import Home from "./Components/Home"
import Navigation from "./Components/Navigation"
import Landing from './Components/Landing'
import Login from './Components/Login'
import React from 'react';
import Signup from './Components/Signup'

 
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Quicksand', "sans-serif"]
  }
}); 

const routes = {
  landing : "/",
  login : "/login",
  signup : "/signup",
  home : "/home"
}

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      loggedIn : true,
      userName : null
    }
  }
  
  logOut = () => {
    this.setState({
      loggedIn : false
    })
  }

  // TO DO 
  // I do need to have Login, Signup and Landing here 
    // those components need this.state.loggedIn as a prop

  render() {
    return (
        <Container > 
          <Router>
          <Navigation loggedIn={this.state.loggedIn} theme={theme} routes={routes} logOut={this.logOut}/>
            <div>
              <Route path={routes.home} component={Home}/>
              <Route exact path={routes.landing} render={()=><Landing logOut={this.logOut}/>}/>
              <Route  path={routes.login} component={Login}/>
              <Route  path={routes.signup} component={Signup}/>            
            </div>
          </Router>
        </Container>
    )
  }
}
