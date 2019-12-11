import firebase from "../../../config/Firebase";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import StyledTextInput from "./StyledTextInput";

const AccommoForm = props => {
  const [reservation, setReservation] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [accommoLocation, setAccommoLocation] = useState("");

  return (
    <form className="travel-accommo-form">
      <StyledTextInput
        label="Reservation"
        value={reservation}
        updateValue={setReservation}
      />
      <StyledTextInput
        label="Lodging"
        value={accommoLocation}
        updateValue={setAccommoLocation}
      />
      <Button>Submit</Button>
      <Button onClick={() => props.cancel(false)}>Cancel</Button>
    </form>
  );
};

export default AccommoForm;
