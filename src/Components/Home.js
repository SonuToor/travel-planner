import DatesForm from "./homecomponents/DatesForm";
import firebase from "../config/Firebase";
import LocationForm from './homecomponents/LocationForm';
import React from 'react';
import Trips from './homecomponents/Trips';
import TripItinerary from './homecomponents/TripItinerary';

export default class Home extends React.Component {
    constructor () {
        super()
        // the location, dates and duration are stored here in state simply to write to the database, as the meta details of the newly created trip.
        // selectedTrip is used to temporarily keep track of the trip that the user wants to edit in TripItinerary 
        this.state = {
            location : "",
            dates : null,
            tripDuration : null,
            selectedTrip : null
        }
    }

    handleDateFormSubmit = (dates, duration) => {
        // store the dates in state and now display the trips of the user, including the new trip 
        this.setState({
            dates : dates,
            tripDuration : duration
        }, 
        this.createTripInFirebase); 

        // you have to clear state at this point, you can't keep city and dates from the previous submission
    }

    handleLocationFormSubmit = (place) => {
        this.setState({
            location : place,
        })
        this.props.showDatesForm()
    }

    createTripInFirebase = () => {
        firebase.database()
            .ref(`trip-details-${firebase.auth().currentUser.uid}/${this.state.dates[0]}`)
            .set({
            'location': this.state.location,
            'dates': this.state.dates,
            'duration' : this.state.tripDuration
        })

        firebase.database()
            .ref(`${this.state.dates[0]}-${firebase.auth().currentUser.uid}/`)
            .set({
                'flight': '',
                'accommodation': '',
                'carrental' : '',
                'train' : ''
                })

        this.props.showTrips()
    }

    displayTrip = (trip) => {
        firebase.database()
        .ref(`trip-details-${firebase.auth().currentUser.uid}/${trip}`)
        .on('value', 
        ((snapshot) => {
            let tripsObj = snapshot.val();
            this.setState({
                selectedTrip : tripsObj
            })
         }))
        this.props.showItinerary()
    }

    componentDidMount = () => {
        // if there is no user logged in, redirect to the landing page, but clear whatever is stored in state 
        if (this.props.loggedIn === false) {
            this.setState({
                location : "",
                dates : null,
                tripDuration : null, 
                tripDetails : {},
                selectedTrip : null
            })
            this.props.history.push(this.props.route) 
        }
    }

    render() {
        return (
            <div>
                {this.props.display.locationForm ? <LocationForm handleLocation={this.handleLocationFormSubmit}/> : null}
                {this.props.display.datesForm ? <DatesForm handleDate={this.handleDateFormSubmit}/> : null}
                {this.props.display.trips ? <Trips displayTrip={this.displayTrip}/> : null}
                {this.props.display.itinerary ? <TripItinerary trip={this.state.selectedTrip}/> : null}
            </div>
        )
    }
}
