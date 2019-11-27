import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import firebase from "./config/Firebase";
import Home from "./Components/Home";
import Navigation from "./Components/Navigation";
import Landing from "./Components/Landing";
import { UserProvider } from "./Contexts/loggedin-context";
import Login from "./Components/Login";
import React from "react";
import Signup from "./Components/Signup";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"]
  }
});

const routes = {
  landing: "/",
  login: "/login",
  signup: "/signup",
  home: "/home",
  trips: "/home/trips",
  location: "/home/location"
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: ""
    };
  }

  logOut = () => {
    // log user out by updating UI and logging out of firebase
    this.setState({
      loggedIn: false,
      user: null
    });
    firebase
      .auth()
      .signOut()
      .then(function() {
        this.props.logOut();
        console.log("user has succesfully logged out");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  signIn = () => {
    // sign in by updating the users email in state and changing the UI
    this.setState({
      user: firebase.auth().currentUser.uid,
      loggedIn: true
    });
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        this.setState({
          user: user,
          loggedIn: true
        });
      } else {
        // No user is signed in.
        this.setState({
          user: null,
          loggedIn: false
        });
      }
    });
  };

  render() {
    return (
      <Container>
        <Router>
          <Navigation
            loggedIn={this.state.loggedIn}
            theme={theme}
            routes={routes}
            logOut={this.logOut}
          />
          <div>
            <UserProvider>
              <Route
                path={routes.home}
                render={props => (
                  <Home
                    {...props}
                    user={this.state.user}
                    route={routes.landing}
                    loggedIn={this.state.loggedIn}
                  />
                )}
              />
              <Route
                exact
                path={routes.landing}
                render={() => <Landing logOut={this.logOut} />}
              />
              <Route
                path={routes.login}
                render={props => (
                  <Login
                    {...props}
                    route={routes.home}
                    logOut={this.logOut}
                    login={this.signIn}
                  />
                )}
              />
              <Route
                path={routes.signup}
                render={props => (
                  <Signup
                    {...props}
                    route={routes.home}
                    logOut={this.logOut}
                    register={this.signIn}
                  />
                )}
              />
            </UserProvider>
          </div>
        </Router>
      </Container>
    );
  }
}
