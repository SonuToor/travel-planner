import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
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
      loggedIn : false,
      user : null
    }
  }

  signIn = (email) => {
    this.setState({
      user : email,
      loggedIn : true
    })
  }
  
  logOut = () => {
    this.setState({
      loggedIn : false, 
      user : null
    })
  }

  render() {
    return (
        <Container > 
          <Router>
          <Navigation loggedIn={this.state.loggedIn} theme={theme} routes={routes} logOut={this.logOut}/>
            <div>
              <Route path={routes.home} component={Home}/>
              <Route exact path={routes.landing} render={()=><Landing logOut={this.logOut}/>}/>
              <Route path={routes.login} render={(props)=><Login {...props} route={routes.home} logOut={this.logOut} login={this.signIn}/>}/>
              <Route path={routes.signup} render={(props)=><Signup {...props} route={routes.home} logOut={this.logOut} register={this.signIn}/>}/>            
            </div>
          </Router>
        </Container>
    )
  }
}
