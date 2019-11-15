import { Button } from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/EventNote'
import './CalendarExport.css'
import React from 'react';
import moment from 'moment'
import Script from 'react-load-script';
import { TripItineraryContext } from '../../../Contexts/tripitinerary-context';

const url = "https://apis.google.com/js/api.js"
var SCOPES = 'https://www.googleapis.com/auth/calendar';
var GoogleAuth;

const API_KEY = process.env.REACT_APP_API_KEY
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

const months = { 
    "January" : "01", 
    "February" : "02", 
    "March" : "03", 
    "April" : "04",
    "May" : "05",
    "June" : "06",
    "July" : "07",
    "August" : "08",
    "September" : "09",
    "October" : "10",
    "November" : "11",
    "December" : "12"}

export default class CalendarExport extends React.Component {
    constructor() {
        super()
        this.state = {
            showAuthButton : true, 
            eventsArray : [], 
        }
        this.getEvents = this.getEvents.bind(this);
      }

    handleScriptLoad = () => {
        window.gapi.load('client:auth2', this.initClient);
    }

    // once the script has loaded, provide credentials and set up an Authorization instance 
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
            if (GoogleAuth.isSignedIn.get()) {
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
                showAuthButton : true, 
            })
        })
      }

      getEvents = () => {
          let trip = this.context[0];

          // map over the days of the itinerary 
          let userEvents = (this.props.dates.map(day => {
              // there is no entries for that day
              if (trip[day] === undefined) {
                  return 
              }
              return {[day] : Object.values(trip[day])}
          }))
          this.setState({
              eventsArray : userEvents
          })
      }

      // TO DO
        // if the event exists in the users Google Calendar, don't write it again (avoid duplicate events on Google Calendar).

        // (1) read the users calendar at the dates and times you plan to write the new events 
        // (2) compare to the events you plan to write
        // (3) if some events exist already with the same name, overwrite or skip entirely? 

      // export the users itinerary events to their Google Calendar
      exportEvents = (event) => {
          this.state.eventsArray.forEach(entry => {
              if (entry === undefined) {
                  return
              }
              else {

                  let date = (Object.keys(entry)[0]).split(' ')
                  let events = Object.values(entry)
                  
                  // go over each event 
                  events[0].forEach(event => {
                    
                      // TO DO 
                        // maybe take this time and date and read the users calendar
                        // if there is an event at the time and day we want to write, compare it to the eventDescription to see if it's a duplicate
                      let time = event.slice(0,5)
                      let eventDescription = event.slice(7);
                      let day;  

                      // format the date according to the rfc3339 standard 
                      date[1].length === 3 ? day = `0${date[1].slice(0, 1)}` : day = date[1].slice(0,2)
                      
                      let startTime = `${date[2]}-${months[date[0]]}-${day}T${time}:00`
                    
                      // increment the data by 30 minutes to create the end time 
                      let endTime = moment(startTime).add('30', 'minutes').format("YYYY-MM-DDTHH:mm:ss")

                      let timeZone = (Intl.DateTimeFormat().resolvedOptions().timeZone);

                      // create the meta details for the trip
                      var eventEntry = {
                          "summary" : eventDescription,
                          "start" : {
                              "dateTime" : startTime,
                              'timeZone': timeZone
                          },
                          "end" : {
                              "dateTime" : endTime,
                              'timeZone': timeZone
                          }
                      }
                      // write event to calendar 
                      window.gapi.client.load('calendar', 'v3', function() {
                        var request = window.gapi.client.calendar.events.insert({
                            'calendarId': 'primary',
                            'resource': eventEntry
                          });
                          // change the colour of the button depending on whether the write was sucessful or unsuccesfull
                        request.execute(function(resp) {
                            if(resp.status==='confirmed')  {
                                let button = document.getElementById("export-button")
                                button.classList.add("success")
                            }
                        else {
                            let button = document.getElementById("export-button")
                            button.classList.add("failure")
                        }
                        })
                      })
                  })
              }
          })
      }

    render() {
        return (
            <div className="google-calendar-export">
                <Script url={url} onLoad={this.handleScriptLoad}/>  
                <span><CalendarIcon/>Export trip itinerary to your Google Calendar?</span>
                {this.state.showAuthButton === true ? 
                <Button id="authorize-button" onClick={this.handleAuthClick}>Authorize</Button> 
                : 
                <Button id="signout-button" onClick={this.handleSignoutClick}>Sign Out</Button>}
                {this.state.showAuthButton === true ? 
                null 
                : 
                <Button id="export-button" onClick={this.exportEvents}>Export</Button>}
            </div>
        )
    }
}

CalendarExport.contextType = TripItineraryContext;