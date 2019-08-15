import React from 'react';
import Trips from './homecomponents/Trips'

export default class Home extends React.Component {
    // main logic should go here?
        // does this carry most of the info in state?
            // log in info should stay in App.js
        // write to firebase from here?
// 

    render() {
        return (
            <div>
                <h1> Home Page - Once logged in</h1>
                {this.props.displayTrips ? <Trips/> : null}
            </div>
        )
    }
}
