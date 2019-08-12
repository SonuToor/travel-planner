import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';


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




        const classes = useStyles();

        return (
            <div className={classes.root}>
              <AppBar position="static" style={{backgroundColor: "#836529", opacity:"0.92", color:"black"}}>
                <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <HomeIcon />
                  </IconButton>
                  <h4 className={classes.title}>Have something to say here.</h4>
                  {props.loggedIn ? <Button color="inherit">My Trips</Button> : null}
                  {props.loggedIn ? <Button color="inherit">Logout</Button> : <Button color="inherit">Login</Button>}
                </Toolbar>
              </AppBar>
            </div>
          )
        
}

export default Navigation