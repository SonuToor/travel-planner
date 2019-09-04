import { CSSTransitionGroup } from 'react-transition-group';
import firebase from '../../config/Firebase'
import Itinerary from './Itinerary'
import moment from 'moment';
import React from "react"
import TravelAndAccommoInput from "./TravelAndAccommoInput"
import './TripItinerary.css'


export default class TripItinerary extends React.Component {
    // constructor () {
    //     super() 
    //     this.state =  {

    //     }
    // }

    // when a user updates information regarding the accommodation or travel, this function will update the information in firebase
    handleTravelAccommoInput = (flight, accommo, carRental, train) => {
        firebase.database()
            .ref(`${this.props.trip.dates[0]}-${firebase.auth().currentUser.uid}/`)
            .set({
                'flight': flight,
                'accommodation': accommo,
                'carrental' : carRental,
                'train' : train
                })
    }

    getDatesArray = (startDate, stopDate) => {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('MMMM Do YYYY') )
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    // TO DO 
        // decide what the actual UI will look like
            // what inputs, how will it be laid out, what info to be displayed
        
        // figure out how to simulatenously read and write to firebase
            // so user sees what they put last time into the itinerary and can add to it

        // where is the info from TravelAndAccommoInput going to be displayed?

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
                <TravelAndAccommoInput updateInfo={this.handleTravelAccommoInput}/>
                <Itinerary dates={this.getDatesArray(this.props.trip.dates[0], this.props.trip.dates[1])}/>
            </CSSTransitionGroup>
        )
    }
}