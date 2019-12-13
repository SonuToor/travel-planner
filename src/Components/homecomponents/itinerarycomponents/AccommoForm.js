import { Button } from "@material-ui/core";
import DateTimePicker from "react-datetime-picker";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../../../config/Firebase";
import React, { useState } from "react";
import StyledTextInput from "./StyledTextInput";
import StyledButton from "../StyledButton";

const AccommoForm = props => {
  const handleSubmit = event => {
    event.preventDefault();
    console.log("submitted");
    props.close();
  };

  const [reservation, setReservation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [accommoLocation, setAccommoLocation] = useState("");

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Accommodation</DialogTitle>
      <DialogContent>
        <form className="travel-accommo-form" onSubmit={handleSubmit}>
          <StyledTextInput
            label="Reservation"
            value={reservation}
            updateValue={setReservation}
          />
          <StyledTextInput
            label="Lodging"
            value={accommoLocation}
            required
            updateValue={setAccommoLocation}
          />
          <DateTimePicker value={checkIn} onChange={date => setCheckIn(date)} />
          <DateTimePicker
            value={checkOut}
            onChange={date => setCheckOut(date)}
          />
        </form>
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <StyledButton text="Cancel" handleClick={props.close} />
        <StyledButton text="Add" handleClick={props.close} />
      </DialogActions>
    </Dialog>
  );
};

export default AccommoForm;
