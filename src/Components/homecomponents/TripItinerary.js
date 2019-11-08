import { CSSTransitionGroup } from 'react-transition-group';
import CalendarExport from './itinerarycomponents/CalendarExport';
import firebase from '../../config/Firebase'
import Itinerary from './itinerarycomponents/Itinerary'
import moment from 'moment';
import React, { useContext, useEffect } from "react"
import TravelAndAccommoInput from "./itinerarycomponents/TravelAndAccommoInput";
import './TripItinerary.css'
import { TripItineraryContext } from '../../Contexts/tripitinerary-context';


const TripItinerary = (props) => {

    const [trip, updateTrip] = useContext(TripItineraryContext)

    // when a user updates information regarding their accommodation or travel, this function will update the information in firebase
    const handleTravelAccommoInput = (flight, accommo, carRental, train) => {
        // if the user doesn't submit a new entry for a specific field, keep the field the same. 
        if (flight === '') {
            flight = trip['flight']
        }
        if (accommo === '') {
            accommo = trip['accommodation']
        }
        if (carRental === '') {
            carRental = trip['carrental']
        }
        if (train === '') {
            train = trip['train']
        }

        firebase.database()
            .ref(`${props.trip.dates[0]}-${firebase.auth().currentUser.uid}/`)
            .set({
                'flight': flight,
                'accommodation': accommo,
                'carrental' : carRental,
                'train' : train
                })
    }

    const getDatesArray = (startDate, stopDate) => {
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

    // get the trips for the selected trip add them to the TripContext so it's available wherever it might be needed in the app     
    const fetchTripData = () => {
        firebase.database()
        .ref(`${props.trip.dates[0]}-${firebase.auth().currentUser.uid}/`)
        .on('value', 
        ((snapshot) => {
            let tripsObj = snapshot.val();
            updateTrip(tripsObj)
        }))
    }

    useEffect(() => {
        fetchTripData()
    }, [])

        return (
            <CSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
                <h2 className="trip-title">{`Your trip to ${props.trip["location"]}`}</h2>
                <h4 className="trip-date-title">{`${props.trip["dates"][0].slice(3)} to ${props.trip["dates"][1].slice(3)}`}</h4>
                <TravelAndAccommoInput updateInfo={handleTravelAccommoInput}/>
                <CalendarExport dates={getDatesArray(props.trip.dates[0], props.trip.dates[1])}/>
                <Itinerary dates={getDatesArray(props.trip.dates[0], props.trip.dates[1])} dateID={props.trip.dates[0]}/>
            </CSSTransitionGroup>
        )
}


export default TripItinerary