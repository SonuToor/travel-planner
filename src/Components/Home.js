import DatesForm from "./homecomponents/DatesForm"
import LocationForm from './homecomponents/LocationForm'
import React from 'react';
import Trips from './homecomponents/Trips'

export default class Home extends React.Component {
    constructor () {
        super()
        this.state = {
            locationFormDisplay : true,
            datesFormDisplay : false,
            location : "",
            dates : null
        }
    }

    // TO DO 
        // this.state.location/dates needs to be stored in firebase when the user submits their form 

        // what is the schema to be used for firebase?
            // the trip is stored ... (is the key or identifier the location or the date? - probably the date as it would be unique they could visit a place twice)

            // what is stored in the trip database for the user?
                // the itinerary --- now is the itinerary stored as a whole or stored split per day? -- what makes sense for the trips display?

    handleDateFormSubmit = (dates) => {
        this.setState({
            dates : dates
        })
        return this.state.location, this.state.dates
    }

    handleLocationFormSubmit = (place) => {
        this.setState({
            location : place,
            locationFormDisplay : false,
            datesFormDisplay : true,
        })
    }

    componentDidMount = () => {
        // if there is no user logged in, redirect to the landing page
        if (this.props.loggedIn === false) {
            this.props.history.push(this.props.route) 
            }
    }

    clearHomeForTripsDisplay = () => {
        this.setState({
            datesFormDisplay : false,
            locationFormDisplay : false
        })
    }


    render() {
        return (
            <div>
                {this.state.locationFormDisplay ? <LocationForm handleLocation={this.handleLocationFormSubmit}/> : null}
                {this.state.datesFormDisplay ? <DatesForm handleDate={this.handleDateFormSubmit}/> : null}
                {this.props.displayTrips ? <Trips display={this.clearHomeForTripsDisplay}/> : null}
            </div>
        )
    }
}
