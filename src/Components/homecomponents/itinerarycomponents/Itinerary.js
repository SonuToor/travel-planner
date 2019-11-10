import CalendarExport from './CalendarExport';
import Chip from '@material-ui/core/Chip';
import Day from './Day'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import firebase from '../../../config/Firebase'
import Flight from '@material-ui/icons/Flight';
import "./Itinerary.css";
import LocalHotel from '@material-ui/icons/LocalHotel';
import React, { useContext } from 'react';
import TrainIcon from '@material-ui/icons/Train';
import { TripItineraryContext } from '../../../Contexts/tripitinerary-context';



export default function Itinerary (props) {

    const [trip, updateTrip] = useContext(TripItineraryContext)

    const handleActivityAdd = (day, time, activity) => {

        if (activity === "") {
            return
        }
      
        let activityEntry = `${time} - ${activity}`;

        // add the newly created event to firebase, once it is written to firebase it automatically updates the UI
        firebase.database()
        .ref(`${props.dateID}-${firebase.auth().currentUser.uid}/${day}`)
        .update({
            [time] : activityEntry
            })
    }

    return (
        <div className="itinerary">
            <div className="travelaccommo-display">
                <Chip
                    icon={<Flight/>}
                    label={trip['flight'] === null ? "" : trip['flight']}/>
                <Chip
                    icon={<LocalHotel/>}
                    label={trip['accommodation'] === null ? "" : trip['accommodation']}/>
                <Chip
                    icon={<DirectionsCarIcon/>}
                    label={trip['carrental'] === null ? "" : trip['carrental']}/>
                <Chip
                    icon={<TrainIcon/>}
                    label={trip['train'] === null ? "" : trip['train']}/>
            </div>
            <CalendarExport dates={props.dates}/>
            {props.dates.map((day, i)  =>
                <Day key={day} date={day} index={i} handleAdd={handleActivityAdd} dateID={props.dateID}/>
            )}
        </div>
    )
    

}