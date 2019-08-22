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
            tripDuration : null
        }
    }

    handleDateFormSubmit = (dates, duration) => {
        // store the dates in state and now display the trips of the user, including the new trip 
        this.setState({
            dates : dates,
            tripDuration : duration
        })

        this.writeTripDetails()
        // you have to clear state at this point, you can't keep city and dates from the previous submission
    }

    handleLocationFormSubmit = (place) => {
        this.setState({
            location : place,
        })
        this.props.showDatesForm()
    }

    writeTripDetails = () => {
        // TO DO 
            // this only writes 'location' to userID/trip-details 
            // 'dates' and 'duration' never get written 

            // if the person creates a second trip, are these trip details are then overwritten!

            // MAJOR TO DO!
                // now that database is writing somewhat correctly, figure out the schema!
                // what is the schema to be used for firebase?
                    // the trip is stored ... (is the key or identifier the location or the date? - probably the date as it would be unique they could visit a place twice)

                // what is stored in the trip database for the user?
                    // the itinerary --- now is the itinerary stored as a whole or stored split per day? -- what makes sense for the trips display?
    
        firebase.database().ref(firebase.auth().currentUser.uid + "/trip-details").set({
            'location': this.state.location,
            'dates': this.state.dates,
            'duration' : this.state.tripDuration
        })
        .then(function(){
            this.props.showTrips()
        })
        .catch(function onError(err) {
            console.log(err)
        });       
    }

    componentDidMount = () => {
        // if there is no user logged in, redirect to the landing page
        if (this.props.loggedIn === false) {
            this.props.history.push(this.props.route) 
            }
    }


    render() {
        return (
            <div>
                {this.props.display.locationForm ? <LocationForm handleLocation={this.handleLocationFormSubmit}/> : null}
                {this.props.display.datesForm ? <DatesForm handleDate={this.handleDateFormSubmit}/> : null}
                {this.props.display.trips ? <Trips display={this.props.showTrips}/> : null}
            </div>
        )
    }
}
