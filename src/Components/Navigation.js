import AppBar from '@material-ui/core/AppBar';
import {  NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import firebase from '../config/Firebase'
import ExploreIcon from '@material-ui/icons/Explore';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import "./Navigation.css"

  
// this is the Navigation bar that is stickied to the top of the page thoroughout the App 
function Navigation(props) {

        const useStyles = makeStyles(theme => ({
            root: {
              flexGrow: 1,
            },
            menuButton: {
              marginRight: theme.spacing(2),
            },
            title: {
              flexGrow: 1,
            },
        }));

        const routes = props.routes

        const classes = useStyles();
        
        let logOutUser = () => {
          // if the logout button is clicked log the user out 
          firebase.auth().signOut()
          .then(function() { 
            this.props.logOut()
            console.log("user has succesfully logged out")
          })
          .catch(function(error) {
            console.log(error)
          });
        }

        return (
            <div className={classes.root}>
              <AppBar position="static" style={{backgroundColor: "#836529", opacity:"0.92", color:"black"}}>
                <Toolbar>
                  {props.loggedIn ? 
                    <NavLink to={routes.home} onClick={props.clearHome}>
                      <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                        <ExploreIcon />
                      </IconButton>
                   </NavLink>
                  :
                  <NavLink to={routes.landing}>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                      <ExploreIcon />
                    </IconButton>
                  </NavLink>
                  }
                  <h4 className={classes.title}>Let's get exploring!</h4>
                  {props.loggedIn ? 
                    <Button onClick={props.trips}>My Trips</Button> 
                    : 
                    <NavLink to={routes.signup}>
                      <Button>Sign Up</Button>
                    </NavLink>
                  }
                  {props.loggedIn ? 
                    <NavLink to={routes.landing}>
                      <Button onClick={logOutUser}>Logout</Button>
                    </NavLink>  
                    :
                    <NavLink to={routes.login}>
                      <Button>Login</Button>
                    </NavLink>
                   }
                </Toolbar>
              </AppBar>
            </div>
          ) 
}

export default Navigation