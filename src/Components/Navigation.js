import AppBar from '@material-ui/core/AppBar';
import {  NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import "./Navigation.css"

  

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

        return (
            <div className={classes.root}>
              <AppBar position="static" style={{backgroundColor: "#836529", opacity:"0.92", color:"black"}}>
                <Toolbar>
                  {props.loggedIn ? 
                    <NavLink to={routes.home}>
                      <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                        <HomeIcon />
                      </IconButton>
                   </NavLink>
                  :
                  <NavLink to={routes.landing}>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                      <HomeIcon />
                    </IconButton>
                  </NavLink>
                  }
                  <h4 className={classes.title}>Have something to say here.</h4>
                  {props.loggedIn ? 
                    <Button>My Trips</Button> 
                    : 
                    <NavLink to={routes.signup}>
                      <Button>Sign Up</Button>
                    </NavLink>
                  }
                  {props.loggedIn ? 
                    <NavLink to={routes.landing}>
                      <Button>Logout</Button>
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