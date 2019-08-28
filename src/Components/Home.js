import DatesForm from "./homecomponents/DatesForm"
import firebase from "../config/Firebase"
import LocationForm from './homecomponents/LocationForm'
import React from 'react';
import Trips from './homecomponents/Trips'

export default class Home extends React.Component {
    constructor () {
        super()
        this.state = {
            location : "",
            dates : null,
            tripDuration : null,
        }
    }

    handleDateFormSubmit = (dates, duration) => {
        // store the dates in state and now display the trips of the user, including the new trip 
        this.setState({
            dates : dates,
            tripDuration : duration
        }, 
        this.writeTripDetails); 

        // you have to clear state at this point, you can't keep city and dates from the previous submission
    }

    handleLocationFormSubmit = (place) => {
        this.setState({
            location : place,
        })
        this.props.showDatesForm()
    }

    writeTripDetails = () => {
            // MAJOR TO DO!  ---- LOOK AT CLIO NOTEBOOK FOR MOCKUPS AND QUESTIONS!!
                // now that database is writing somewhat correctly, figure out the schema!
                // what is the schema to be used for firebase?
                // I am thinking:
                    // userID/trips/trip <--- where trip is the date the user is leaving on
                    // userID/trips/trip/trip-details <--- where meta data for the trip is stored
                    // userID/trips/trip/itinerary <--- where the itinerary is stored
                    // the trip is stored ... (is the key or identifier the location or the date? - probably the date as it would be unique they could visit a place twice)

                // what is stored in the trip database for the user?
                    // the itinerary --- now is the itinerary stored as a whole or stored split per day? -- what makes sense for the trips display?
    
        firebase.database()
            .ref(`trip-details-${firebase.auth().currentUser.uid}/${this.state.dates[1]}`)
            .set({
            'location': this.state.location,
            'dates': this.state.dates,
            'duration' : this.state.tripDuration
        })

        this.props.showTrips()
    }

    // getTrips = () => {
    //     // get the meta-details for the trips that are stored in the database 
    //     firebase.database()
    //         .ref(`trip-details-${firebase.auth().currentUser.uid}`)
    //         .on('value')
    //         .then((snapshot) => {
    //         let tripsObj = snapshot.val();
    //         this.setState({
    //             tripDetails : tripsObj
    //         })
    //     })
    // }

    componentDidMount = () => {
        // if there is no user logged in, redirect to the landing page
        if (this.props.loggedIn === false) {
            this.setState({
                location : "",
                dates : null,
                tripDuration : null, 
                tripDetails : {}
            })
            this.props.history.push(this.props.route) 
        }
    }


    render() {
        return (
            <div>
                {this.props.display.locationForm ? <LocationForm handleLocation={this.handleLocationFormSubmit}/> : null}
                {this.props.display.datesForm ? <DatesForm handleDate={this.handleDateFormSubmit}/> : null}
                {this.props.display.trips ? <Trips /> : null}
            </div>
        )
    }
}
