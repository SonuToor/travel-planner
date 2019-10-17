import { Button } from '@material-ui/core';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import Flight from '@material-ui/icons/Flight';
import IndividualAvatarInputs from './IndividualAvatarInputs';
import LocalHotel from '@material-ui/icons/LocalHotel';
import React, { useState } from "react"
import TrainIcon from '@material-ui/icons/Train';
import "./TravelAndAccommoInput.css"


export default function TravelAndAccommoInput(props) { 
    
    // these are the hooks for each input 
    const [flightData, updateFlight] = useState("") 
    const [accommoData, updateAccommo] = useState("") 
    const [carData, updateCar] = useState("") 
    const [trainData, updateTrain] = useState("") 

    let handleSubmit = (event) => {
        event.preventDefault()
        props.updateInfo(flightData, accommoData, carData, trainData)
    }

    return (
        <form className="accommodation-travel-input" onSubmit={handleSubmit}>
            <IndividualAvatarInputs 
            icon={<Flight/>}
            id="flight-input"
            onChange={e => updateFlight(e.target.value)}
            placeholder="Enter flight info."
            value={flightData}
            />
            <IndividualAvatarInputs
            icon={<LocalHotel />}
            id="accommo-input"
            onChange={e => updateAccommo(e.target.value)}
            placeholder="Enter accommodation."
            value={accommoData}
            />
            <IndividualAvatarInputs 
            icon={<DirectionsCarIcon />}
            id="rentalcar-input"
            onChange={e => updateCar(e.target.value)}
            placeholder="Enter car rental info."
            value={carData}
            />
            <IndividualAvatarInputs
            icon={<TrainIcon />}
            id="bustrain-input"
            onChange={e => updateTrain(e.target.value)}
            placeholder="Enter bus/train info."
            value={trainData}
            />
            <Button
                style={{
                    backgroundColor : "#836529",
                    height: "80%",
                    marginTop: "1%"
                }}
                type="submit">
            Update
            </Button>
        </form>
    )
}