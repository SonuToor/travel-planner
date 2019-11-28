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
import React, { useState } from "react";
import Signup from "./Components/Signup";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"]
  }
});

const routes = {
  landing: "/landing",
  login: "/login",
  signup: "/signup",
  home: "/home",
  trips: "/home/trips",
  location: "/home/location"
};

const App = props => {
  const [user, updateUser] = useState(localStorage.getItem("user"));

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("user has succesfully logged out");
        localStorage.setItem("user", null);
        updateUser(localStorage.getItem("user"));
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const signIn = () => {
    localStorage.setItem("user", firebase.auth().currentUser.uid);
    updateUser(localStorage.getItem("user"));
  };

  // componentDidMount = () => {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       localStorage.setItem('user', user.uid);
  //       this.setState({
  //         user: user.uid
  //       })
  //     } else {
  //       // No user is signed in.
  //       localStorage.setItem('user', null)
  //       this.setState({
  //         user: "null"
  //       })
  //     }
  //   });
  // };

  return (
    <Container>
      <Router>
        <Navigation user={user} theme={theme} routes={routes} logOut={logOut} />
        <div>
          <UserProvider>
            <Route
              path={routes.home}
              render={props => (
                <Home {...props} user={user} route={routes.landing} />
              )}
            />
            <Route
              exact
              path={routes.landing}
              render={() => <Landing logOut={logOut} />}
            />
            <Route
              path={routes.login}
              render={props => (
                <Login
                  {...props}
                  route={routes.home}
                  logOut={logOut}
                  login={signIn}
                />
              )}
            />
            <Route
              path={routes.signup}
              render={props => (
                <Signup
                  {...props}
                  route={routes.home}
                  logOut={logOut}
                  register={signIn}
                />
              )}
            />
          </UserProvider>
        </div>
      </Router>
    </Container>
  );
};

export default App;
