import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LocalHotel from '@material-ui/icons/LocalHotel';
import React from "react"
import TextField from '@material-ui/core/TextField';
import "./TravelAndAccommoInput.css"






export default function TravelAndAccommoInput() {  
    return (
        <div className="accommodation-travel-input">
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LocalHotel />
                        </Avatar>
                    </ListItemAvatar>
                    <TextField placeholder="Enter your Accommodation Info"/>
                </ListItem>
            </List>
        </div>
    )
}