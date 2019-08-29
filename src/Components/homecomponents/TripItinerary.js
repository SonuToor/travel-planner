import { CSSTransitionGroup } from 'react-transition-group';
import firebase from '../../config/Firebase'
import React from "react"
import './TripItinerary.css'


export default class TripItinerary extends React.Component {
    constructor() {
        super()
        this.state = {
            tripDetails : {}
        }
    }

    componentDidMount = () => { 
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
                <p>show individual trip itinerary</p>
            </CSSTransitionGroup>
        )
    }
}