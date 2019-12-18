import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import Flight from "@material-ui/icons/Flight";
import LocalHotel from "@material-ui/icons/LocalHotel";
import TrainIcon from "@material-ui/icons/Train";
import React, { useContext, useEffect } from "react";
import StyledDivider from "./StyledDivider";
import TransportDisplay from "./TransportDisplay";
import { TripItineraryContext } from "../../../Contexts/tripitinerary-context";

const TravelAndAccommoDisplay = props => {
  const [trip, updateTrip] = useContext(TripItineraryContext);

  // before rendering these out, need to check for undefined
  const flights = trip["Flight"];
  const accommo = trip["Accommo"];
  const busses = trip["Bus"];
  const trains = trip["Train"];
  return (
    <div className="travel-accommo-display">
      <List>
        <StyledDivider />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalHotel />
            </Avatar>
          </ListItemAvatar>
          {accommo === undefined ? (
            <ListItemText
              primary="Accommodation"
              secondary="Nothing here yet!"
            />
          ) : (
            <ListItemText primary="Accommodation" secondary={"info here"} />
          )}
        </ListItem>
        <StyledDivider />
        <TransportDisplay
          icon={<DirectionsBusIcon />}
          data={busses}
          transport="Buses"
        />
        <StyledDivider />
        <TransportDisplay
          icon={<Flight />}
          data={flights}
          transport="Flights"
        />
        <StyledDivider />
        <TransportDisplay
          icon={<TrainIcon />}
          data={trains}
          transport="Trains"
        />
        <StyledDivider />
      </List>
    </div>
  );
};

export default TravelAndAccommoDisplay;
