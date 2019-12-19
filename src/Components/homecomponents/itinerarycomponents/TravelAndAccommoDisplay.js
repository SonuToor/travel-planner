import List from "@material-ui/core/List";
import AccommoDisplay from "./AccommoDisplay";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import Flight from "@material-ui/icons/Flight";
import TrainIcon from "@material-ui/icons/Train";
import React, { useContext } from "react";
import StyledDivider from "./StyledDivider";
import TransportDisplay from "./TransportDisplay";
import { TripItineraryContext } from "../../../Contexts/tripitinerary-context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: "4px",
    paddingBottom: "4px"
  }
}));

const TravelAndAccommoDisplay = props => {
  const [trip, updateTrip] = useContext(TripItineraryContext);
  const classes = useStyles();

  // before rendering these out, need to check for undefined
  const flights = trip["Flight"];
  const accommo = trip["Accommo"];
  const busses = trip["Bus"];
  const trains = trip["Train"];
  return (
    <div className="travel-accommo-display">
      <List className={classes.root}>
        <StyledDivider />
        <AccommoDisplay data={accommo} dateID={props.dateID} />
        <StyledDivider />
        <TransportDisplay
          icon={<DirectionsBusIcon />}
          data={busses}
          transport="Bus"
          dateID={props.dateID}
        />
        <StyledDivider />
        <TransportDisplay
          icon={<Flight />}
          data={flights}
          transport="Flight"
          dateID={props.dateID}
        />
        <StyledDivider />
        <TransportDisplay
          icon={<TrainIcon />}
          data={trains}
          transport="Train"
          dateID={props.dateID}
        />
        <StyledDivider />
      </List>
    </div>
  );
};

export default TravelAndAccommoDisplay;
