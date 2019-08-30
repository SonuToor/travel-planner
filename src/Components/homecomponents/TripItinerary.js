import { CSSTransitionGroup } from 'react-transition-group';
// import firebase from '../../config/Firebase'
import React from "react"
import TravelAndAccommoInput from "./TravelAndAccommoInput"
import './TripItinerary.css'


export default class TripItinerary extends React.Component {
    // TO DO 
        // decide what the actual UI will look like
            // what inputs, how will it be laid out, what info to be displayed
        
        // figure out how to simulatenously read and write to firebase
            // so user sees what they put last time into the itinerary and can add to it
    render() {
        return (
            <CSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
                <h2 className="trip-title">{`Your trip to ${this.props.trip["location"]}`}</h2>
                <h4 className="trip-date-title">{`${this.props.trip["dates"][0].slice(3)} to ${this.props.trip["dates"][1].slice(3)}`}</h4>
                <TravelAndAccommoInput/>
            </CSSTransitionGroup>
        )
    }
}