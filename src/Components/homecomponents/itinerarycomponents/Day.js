import Add from '@material-ui/icons/Add'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './Day.css'
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import IconButton from '@material-ui/core/IconButton';
import "./Itinerary.css";
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import TimePicker from 'react-time-picker';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: '5%'
    },
    card: {
        minWidth: 325,
      },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    }));

export default function Day(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [time, handleTime] = useState('00:00');
    const [activity, handleActivity] = useState(''); 
    
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAdd(props.date, time, activity)
        handleActivity('')
        handleTime('00:00')
    }
    
     let onChange = time => handleTime(time)
     
     // TO DO 
     let activities = props.activities;

    return (
            <ExpansionPanel expanded={expanded === `panel${props.index}`} onChange={handleChange(`panel${props.index}`)}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography className={classes.heading}>{props.date}</Typography>
                    <form className="event-form" onSubmit={handleSubmit}>
                        <div className="event-inputs">
                            <TextField 
                                placeholder="Enter activity."
                                onChange={e => handleActivity(e.target.value)}
                                value={activity}/>
                            <TimePicker 
                            onChange={onChange}
                            value={time}
                            clockIcon={null}/>
                        </div>
                        <IconButton type="submit">
                            <Add/>
                        </IconButton>
                    </form>
                </ExpansionPanelSummary>
                <div className="individual-day">
                    <ExpansionPanelDetails>
                            <Card className={classes.card}>
                                <CardContent>

                                    Morning
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                                <CardContent>
                                    Afternoon
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                                <CardContent>
                                    Evening
                                </CardContent>
                            </Card>
                    </ExpansionPanelDetails>
                </div>
            </ExpansionPanel>
    )
}