import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


// TO DO
    // will this be a class component or a functional component?

    // draw sketches of the UI
        // how will information be displayed?

        // how will the user edit their itinerary?

    // using MaterialUI what components of there's will you use?
        // if you use ExpansionPanel like below you need to create an expansion panel for each day
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: '5%'
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
    
export default function Itinerary(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    console.log(props.dates)
    
    return (
        <div className={classes.root}>
        {props.dates.map(day =>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography className={classes.heading}>{day}</Typography>
                <Typography className={classes.secondaryHeading}>Great success!</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
            )}
        </div>
    );
}