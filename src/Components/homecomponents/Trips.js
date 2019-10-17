import { CSSTransitionGroup } from 'react-transition-group';
import firebase from '../../config/Firebase'
import React from "react"
import TripCards from "./TripCards"
import './Trips.css'

export default class Trips extends React.Component {
    constructor() {
        super()
        this.state = {
            tripDetails : {}
        }
    }

    // provide Home.js the details of the trip that user has selected
    tripSelected = (event) => {
        event.preventDefault();
        this.props.displayTrip(event.target.id)
    }


    componentDidMount = () => { 
        // from firebase get the nodes that represent each set of meta details for each trip that the user has created so they can be displayed on a TripCard
        firebase.database()
            .ref(`trip-details-${firebase.auth().currentUser.uid}`)
            .on('value', 
            ((snapshot) => {
                let tripsObj = snapshot.val();
                this.setState({
                    tripDetails : tripsObj
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
                <h2 className="main-title">Trips</h2>
                {this.state.tripDetails === null || this.state.tripDetails === undefined ? 
                <h3 className="no-trips-title">No trips saved yet!</h3> 
                :
                <TripCards trips={this.state.tripDetails} tripsKeys={Object.keys(this.state.tripDetails)} tripSelected={this.tripSelected}/>}
            </CSSTransitionGroup>
        )
    }
}