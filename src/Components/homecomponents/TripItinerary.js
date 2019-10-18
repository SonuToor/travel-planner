import { CSSTransitionGroup } from 'react-transition-group';
import CalendarExport from './itinerarycomponents/CalendarExport';
import firebase from '../../config/Firebase'
import Itinerary from './itinerarycomponents/Itinerary'
import moment from 'moment';
import React from "react"
import TravelAndAccommoInput from "./itinerarycomponents/TravelAndAccommoInput";
import './TripItinerary.css'


export default class TripItinerary extends React.Component {
    constructor() {
        super() 
        this.state =  {
            itinerarySnap : '' 
        }
    }

    // when a user updates information regarding their accommodation or travel, this function will update the information in firebase
    handleTravelAccommoInput = (flight, accommo, carRental, train) => {
        // if the user doesn't submit a new entry for a specific field, keep the field the same. 
        if (flight === '') {
            flight = this.state.itinerarySnap['flight']
        }
        if (accommo === '') {
            accommo = this.state.itinerarySnap['accommodation']
        }
        if (carRental === '') {
            carRental = this.state.itinerarySnap['carrental']
        }
        if (train === '') {
            train = this.state.itinerarySnap['train']
        }
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
        // get an array of dates between the first and last dates of the trip 
        var dateArray = [];
        var currentDate = moment(startDate);
        var endDate = moment(stopDate);
        while (currentDate <= endDate) {
            dateArray.push( moment(currentDate).format('MMMM Do YYYY') )
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }
        componentDidMount = () => {
            // when the component mounts get the requisite information about the itinerary for the  selected trip from firebase 
            firebase.database()
            .ref(`${this.props.trip.dates[0]}-${firebase.auth().currentUser.uid}/`)
            .on('value', 
            ((snapshot) => {
                let tripsObj = snapshot.val();
                this.setState({
                    itinerarySnap : tripsObj
                })
             }))
        }


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
                <CalendarExport dates={this.getDatesArray(this.props.trip.dates[0], this.props.trip.dates[1])} itinerary={this.state.itinerarySnap}/>
                <Itinerary dates={this.getDatesArray(this.props.trip.dates[0], this.props.trip.dates[1])} itinerary={this.state.itinerarySnap} dateID={this.props.trip.dates[0]}/>
            </CSSTransitionGroup>
        )
    }
}