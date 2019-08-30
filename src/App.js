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
      datesFormDisplay : false,
      displayTrips : false,
      itineraryDisplay : false,
      locationFormDisplay : true,
      loggedIn : false,
      user : null,
    }
  }
  
  logOut = () => {
    // log user out by updating UI and logging out of firebase
    this.setState({
      loggedIn : false, 
      user : null,
      displayTrips : false,
      itineraryDisplay : false
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
    // sign in by updating the users email in state and changing the UI
    this.setState({
      user : email,
      loggedIn : true,
      locationFormDisplay : true,
    })
  }

  // the following four methods are used to update the UI of the Home Component
    // the Home Component in essence is the heart of trip-planner, I have separated the logic that involves the rendering of components to App.js 
  
  clearHome = () => {
    // here you should remove anything else and have the home page looking the way it would when you first login 
    this.setState({
      displayTrips : false,
      datesFormDisplay : false,
      locationFormDisplay : true,
      itineraryDisplay : false
    })
  }

  showDatesForm = () => {
    // now after the location is submitted render the form that prompts for dates 
    this.setState({
      displayTrips : false,
      locationFormDisplay : false,
      itineraryDisplay : false,
      datesFormDisplay : true,
    })
  }
  
  usersTrips = () => {
    // display the users trips only and remove other forms 
    this.setState({
      displayTrips : true,
      locationFormDisplay : false,
      datesFormDisplay : false,
      itineraryDisplay : false
    })
  }

  displayTripItinerary = () => {
    this.setState({
      displayTrips : false,
      locationFormDisplay : false,
      datesFormDisplay : false, 
      itineraryDisplay : true
    })
  }

  render() {
    const homeDisplay = {
      locationForm : this.state.locationFormDisplay,
      datesForm : this.state.datesFormDisplay,
      trips : this.state.displayTrips,
      itinerary : this.state.itineraryDisplay
    }
    return (
        <Container > 
          <Router>
          <Navigation loggedIn={this.state.loggedIn} theme={theme} routes={routes} logOut={this.logOut} trips={this.usersTrips} clearHome={this.clearHome}/>
            <div>
              <Route path={routes.home} render={(props) => <Home {...props}  user={this.state.user} route={routes.landing} loggedIn={this.state.loggedIn} display={homeDisplay} showTrips={this.usersTrips} showDatesForm={this.showDatesForm} showItinerary={this.displayTripItinerary}/>}/>
              <Route exact path={routes.landing} render={()=><Landing logOut={this.logOut}/>}/>
              <Route path={routes.login} render={(props)=><Login {...props} route={routes.home} logOut={this.logOut} login={this.signIn}/>}/>
              <Route path={routes.signup} render={(props)=><Signup {...props} route={routes.home} logOut={this.logOut} register={this.signIn}/>}/>            
            </div>
          </Router>
        </Container>
    )
  }
}
