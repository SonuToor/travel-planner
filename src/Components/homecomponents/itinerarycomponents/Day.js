import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import "./Itinerary.css";
import React from 'react';
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
    
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
            <ExpansionPanel expanded={expanded === `panel${props.index}`} onChange={handleChange(`panel${props.index}`)}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography className={classes.heading}>{props.date}</Typography>
                    <Typography className={classes.secondaryHeading}>Enter an event and select the time.</Typography>
                    <div className="event-inputs">
                        <TextField 
                            placeholder="Enter event."/>
                        <TimePicker/>
                    </div>
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