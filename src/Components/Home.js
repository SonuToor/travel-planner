import React from 'react';
import LocationForm from './homecomponents/LocationForm'
import plane from "./airplane.png"
import Trips from './homecomponents/Trips'

export default class Home extends React.Component {
    constructor () {
        super()
        this.state = {
            locationFormDisplay : true
        }
    }
    // main logic should go here?
        // does this carry most of the info in state?
            // log in info should stay in App.js
        // write to firebase from here?

    componentDidMount = () => {
        // if there is user logged in, redirect to the landing page
        if (this.props.loggedIn === false) {
            this.props.history.push(this.props.route) 
            }
        }

    render() {
        return (
            <div>
                {this.state.locationFormDisplay ? <LocationForm/> : null}
                {this.props.displayTrips ? <Trips/> : null}
                <img className="plane" src={plane} style={{
                    width : "25%",
                    heigh : "25%"
                }}/>
            </div>
        )
    }
}
