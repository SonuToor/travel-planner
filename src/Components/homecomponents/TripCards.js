import Add from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: "15%"
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TripCards(props) {
    console.log(props.trips, props.tripsKeys)

    const classes = useStyles();
  return (
    <div className="trip-cards">
        {props.tripsKeys.map(trip => 
            <Card className={classes.card} key={trip}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {`${props.trips[trip]["dates"][0].slice(3)} to ${props.trips[trip]["dates"][1].slice(3)}`}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.trips[trip]["location"]}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained">
                        (Edit or View?) Itinerary
                        <Add/>
                    </Button>                
                </CardActions>
            </Card>
        )}
    </div>
  )
}