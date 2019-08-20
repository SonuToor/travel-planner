import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import firebase from './config/Firebase'
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
      user : null,
      displayTrips : false,
    }
  }
  clearHome = () => {
    // here you should remove anything else and have the home page looking the way it would when you first login 
    this.setState({
      displayTrips : false
    })
  }

  logOut = () => {
    this.setState({
      loggedIn : false, 
      user : null,
      displayTrips : false
    })
    firebase.auth().signOut()
          .then(function() { 
            this.props.logOut()
            console.log("user has succesfully logged out")
          })
          .catch(function(error) {
            console.log(error)
          });
  }

  signIn = (email) => {
    this.setState({
      user : email,
      loggedIn : true
    })
  }
  
  usersTrips = () => {
    this.setState({
      displayTrips : true
    })

  }


  render() {
    return (
        <Container > 
          <Router>
          <Navigation loggedIn={this.state.loggedIn} theme={theme} routes={routes} logOut={this.logOut} trips={this.usersTrips}/>
            <div>
              <Route path={routes.home} render={(props) => <Home {...props}  route={routes.landing} loggedIn={this.state.loggedIn} displayTrips={this.state.displayTrips}/>}/>
              <Route exact path={routes.landing} render={()=><Landing logOut={this.logOut}/>}/>
              <Route path={routes.login} render={(props)=><Login {...props} route={routes.home} logOut={this.logOut} login={this.signIn}/>}/>
              <Route path={routes.signup} render={(props)=><Signup {...props} route={routes.home} logOut={this.logOut} register={this.signIn}/>}/>            
            </div>
          </Router>
        </Container>
    )
  }
}
