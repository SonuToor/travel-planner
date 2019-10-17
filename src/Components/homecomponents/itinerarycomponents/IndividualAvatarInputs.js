import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React from "react";
import TextField from '@material-ui/core/TextField';




export default function IndividualAvatarInputs(props) {
    return (
        <List>
            <ListItem>
                <Avatar>
                    {props.icon}
                </Avatar>
                <TextField 
                id={props.id}
                onChange={props.onChange}
                placeholder={props.placeholder}
                value={props.value}/>
            </ListItem>
        </List>
    )
}