import { Button } from '@material-ui/core';
import React from 'react';
import Script from 'react-load-script';

const url = "https://apis.google.com/js/api.js"
var SCOPES = 'https://www.googleapis.com/auth/calendar';
var GoogleAuth;

const API_KEY = process.env.REACT_APP_API_KEY
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID


export default class CalendarExport extends React.Component {
    constructor() {
        super()
        this.state = {
            googleAuth: null,
            showAuthButton : true, 
            calendar : null
        }
        this.getEvents = this.getEvents.bind(this);
      }

    handleScriptLoad = () => {
        window.gapi.load('client:auth2', this.initClient);

        // TO DO    
            // once authorization is given
                // format them 
                // write them correctly to the users Calendar 

    }


    initClient = () => {
        window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          GoogleAuth = window.gapi.auth2.getAuthInstance();
        }, 
        function(error) {
        //   appendPre(JSON.stringify(error, null, 2));
            console.log(error)
        });
      }

    //    Sign in the user upon button click.
      handleAuthClick = (event) => {
        GoogleAuth.signIn()
        .then(() => {
            if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
                this.setState({
                    showAuthButton : false
                },
                this.getEvents())
            }
        })
      }

    // Sign out the user upon button click.
      handleSignoutClick = (event) => {
        GoogleAuth.signOut()
        .then(() => {
            this.setState({
                showAuthButton : true
            })
        })
      }

      getEvents = () => {
          console.log("get users events for this trip and store in state")
          console.log(this.props.itinerary)
            // TO DO
          // go through and now format the events the way they are to be formatted for writing to Google Calendars
      }

      exportEvents = (event) => {
          // TO DO
          // once the export button is clicked export the events to the users calendar

      }

    render() {
        return (
            <div className="google-calendar-export">
                <Script url={url} onLoad={this.handleScriptLoad}/>  
                <span>Export to Google Calendar?</span>
                {this.state.showAuthButton === true ? 
                <Button id="authorize-button" onClick={this.handleAuthClick}>Authorize</Button> 
                : 
                <Button id="signout-button" onClick={this.handleSignoutClick}>Sign Out</Button>}
                <Button id="export-button" onClick={this.exportEvents}>Export</Button>
            </div>
        )
    }
}