import Day from './Day'
import Chip from '@material-ui/core/Chip';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import Flight from '@material-ui/icons/Flight';
import "./Itinerary.css";
import LocalHotel from '@material-ui/icons/LocalHotel';
import React from 'react';
import TrainIcon from '@material-ui/icons/Train';



export default class Itinerary extends React.Component {
    render() {
        return(
        <div className="itinerary">
            <div className="travelaccommo-display">
                <Chip
                    icon={<Flight/>}
                    // label={this.props.itinerary['flight']}
                    label="will get from firebase"
                    />
                <Chip
                    icon={<LocalHotel/>}
                    // label={this.props.itinerary['accommodation']}
                    label="will get from firebase"
                    />
                <Chip
                    icon={<DirectionsCarIcon/>}
                    // label={this.props.itinerary['carrental']}
                    label="will get from firebase"
                    />
                <Chip
                    icon={<TrainIcon/>}
                    // label={this.props.itinerary['train']}
                    label="will get from firebase"
                    />
            </div>
            {this.props.dates.map((day, i)  =>
                <Day key={i} date={day} index={i}/>
            )}
        </div>
        )
    }

}