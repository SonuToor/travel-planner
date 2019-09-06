import Day from './Day'
import Chip from '@material-ui/core/Chip';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import Flight from '@material-ui/icons/Flight';
import "./Itinerary.css";
import LocalHotel from '@material-ui/icons/LocalHotel';
import React from 'react';
import TrainIcon from '@material-ui/icons/Train';



export default class Itinerary extends React.Component {
    constructor() {
        super()
        this.state = {
            itinerarySnap : ''
        }
    }

    // componentDidMount = () => {
    //     // when the component mounts get the requisite information from firebase 
    //     firebase.database()
    //     .ref(`${this.props.trip.dates[0]}-${firebase.auth().currentUser.uid}/`)
    //     .on('value', 
    //     ((snapshot) => {
    //         let tripsObj = snapshot.val();
    //         this.setState({
    //             itinerarySnap : tripsObj
    //         })
    //      }))
    // }
    render() {
        console.log(this.props.itinerary)
        return(
        <div className="itinerary">
            <div className="travelaccommo-display">
                <Chip
                    icon={<Flight/>}
                    label={this.props.itinerary['flight']}
                    />
                <Chip
                    icon={<LocalHotel/>}
                    label={this.props.itinerary['accommodation']}
                    />
                <Chip
                    icon={<DirectionsCarIcon/>}
                    label={this.props.itinerary['carrental']}
                    />
                <Chip
                    icon={<TrainIcon/>}
                    label={this.props.itinerary['train']}
                    />
            </div>
            {this.props.dates.map((day, i)  =>
                <Day key={i} date={day} index={i}/>
            )}
        </div>
        )
    }

}