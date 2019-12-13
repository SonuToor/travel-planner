import { Button } from "@material-ui/core";
import DateTimePicker from "react-datetime-picker";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../../../config/Firebase";
import React, { useContext, useState } from "react";
import StyledTextInput from "./StyledTextInput";
import StyledButton from "../StyledButton";
import { TripItineraryContext } from "../../../Contexts/tripitinerary-context";

const TransportForm = props => {
  // on submit you need a function that writes to firebase
  // it must submit it differently depending on props.transport
  // so when it comes to render it, we know whether it is a flight, train or bus

  const [trip, updateTrip] = useContext(TripItineraryContext);

  console.log(trip);

  const handleSubmit = event => {
    event.preventDefault();
    console.log("submitted");
    props.close();
  };

  const [ticket, setTicket] = useState("");
  const [departsFrom, setDepartsFrom] = useState("");
  const [departDateTime, setDepartDateTime] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{`Add a ${props.transport}`}</DialogTitle>
      <DialogContent>
        <form className="travel-accommo-form">
          <StyledTextInput
            label="Ticket Number"
            value={ticket}
            updateValue={setTicket}
          />
          <StyledTextInput
            label="Departs From"
            value={departsFrom}
            updateValue={setDepartsFrom}
          />
          <StyledTextInput
            label="Destination"
            value={destination}
            updateValue={setDestination}
          />
        </form>
      </DialogContent>
      <DateTimePicker
        value={departDateTime}
        onChange={date => setDepartDateTime(date)}
      />
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <StyledButton text="Cancel" handleClick={props.close} />
        <StyledButton text="Submit" handleClick={props.close} />
      </DialogActions>
    </Dialog>
  );
};

export default TransportForm;
