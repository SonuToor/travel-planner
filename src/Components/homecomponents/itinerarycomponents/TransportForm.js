import firebase from "../../../config/Firebase";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import StyledTextInput from "./StyledTextInput";

const TransportForm = props => {
  // on submit you need a function that writes to firebase
  // it must submit it differently depending on props.transport
  // so when it comes to render it, we know whether it is a flight, train or bus

  const [ticket, setTicket] = useState("");
  const [departsFrom, setDepartsFrom] = useState("");
  const [departDateTime, setDepartDateTime] = useState(null);
  const [destination, setDestination] = useState("");

  return (
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
        label="To"
        value={destination}
        updateValue={setDepartDateTime}
      />
      <Button>Submit</Button>
      <Button onClick={() => props.cancel(false)}>Cancel</Button>
    </form>
  );
};

export default TransportForm;
