import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import Flight from '@material-ui/icons/Flight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LocalHotel from '@material-ui/icons/LocalHotel';
import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
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
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Flight/>
                        </Avatar>
                    </ListItemAvatar>
                    <TextField 
                    id="flight-input"
                    onChange={e => updateFlight(e.target.value)}
                    placeholder="Enter flight info."
                    value={flightData}/>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LocalHotel />
                        </Avatar>
                    </ListItemAvatar>
                    <TextField 
                    id="accommo-input"
                    onChange={e => updateAccommo(e.target.value)}
                    placeholder="Enter accommodation."
                    value={accommoData}/>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <DirectionsCarIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <TextField
                    id="rentalcar-input"
                    onChange={e => updateCar(e.target.value)}
                    placeholder="Enter car rental info."
                    value={carData}/>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <TrainIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <TextField 
                    id="bustrain-input"
                    onChange={e => updateTrain(e.target.value)}
                    placeholder="Enter bus/train info."
                    value={trainData}/>
                </ListItem>
            </List>
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