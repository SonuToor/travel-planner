import Day from './Day'
import Chip from '@material-ui/core/Chip';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import firebase from '../../../config/Firebase'
import Flight from '@material-ui/icons/Flight';
import "./Itinerary.css";
import LocalHotel from '@material-ui/icons/LocalHotel';
import React from 'react';
import TrainIcon from '@material-ui/icons/Train';



export default class Itinerary extends React.Component {

    handleActivityAdd = (day, time, activity) => {

        if (activity === "") {
            return
        }
        let activityEntry = `${time} - ${activity}`;

        firebase.database()
        .ref(`${this.props.dateID}-${firebase.auth().currentUser.uid}/${day}`)
        .update({
            [time] : activityEntry
            })
    }

    render() {
        return(
        <div className="itinerary">
            <div className="travelaccommo-display">
                <Chip
                    icon={<Flight/>}
                    label={this.props.itinerary['flight'] === null ? "" : this.props.itinerary['flight']}/>
                <Chip
                    icon={<LocalHotel/>}
                    label={this.props.itinerary['accommodation'] === null ? "" : this.props.itinerary['accommodation']}
                    />
                <Chip
                    icon={<DirectionsCarIcon/>}
                    label={this.props.itinerary['carrental'] === null ? "" : this.props.itinerary['carrental']}
                    />
                <Chip
                    icon={<TrainIcon/>}
                    label={this.props.itinerary['train'] === null ? "" : this.props.itinerary['train']}
                    />
            </div>
            {this.props.dates.map((day, i)  =>
                <Day key={day} date={day} index={i} handleAdd={this.handleActivityAdd} activities={this.props.itinerary[day]} dateID={this.props.dateID}/>
            )}
        </div>
        )
    }

}