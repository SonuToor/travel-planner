// import firebase from '../config/Firebase'; 
import React, { useState, createContext } from 'react';

export const TripItineraryContext = createContext();

export const ItineraryProvider = props => {
    const [trip, updateTrip] = useState('')
    return (
        <TripItineraryContext.Provider value={[trip, updateTrip]}>
            {props.children}
        </TripItineraryContext.Provider>
    );
}