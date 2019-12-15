import DateTimePicker from "react-datetime-picker";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../../../config/Firebase";
import { monthStringToNum } from "../../../utils";
import React, { useState } from "react";
import StyledTextInput from "./StyledTextInput";
import StyledButton from "../StyledButton";

const AccommoForm = props => {
  const currentMonth = monthStringToNum(props.date.slice(3, 7));
  const [reservation, setReservation] = useState("");
  const [checkIn, setCheckIn] = useState(
    new Date(props.date.slice(11), currentMonth, props.date.slice(7, 10))
  );
  const [checkOut, setCheckOut] = useState(
    new Date(props.date.slice(11), currentMonth, props.date.slice(7, 10))
  );
  const [accommoLocation, setAccommoLocation] = useState("");
  const [validationError, toggleValidationError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    console.log("submitted");
    if (checkIn === "" || accommoLocation === "") {
      toggleValidationError(true);
      return;
    }
    toggleValidationError(false);

    // date string
    console.log(checkIn.toDateString(), checkOut.toDateString());
    // time
    console.log(
      checkIn.toString().slice(16, 21),
      checkOut.toString().slice(16, 21)
    );

    props.close();
  };

  const reset = () => {
    toggleValidationError(false);
    props.close();
  };

  return (
    <Dialog
      open={props.open}
      onClose={reset}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Accommodation</DialogTitle>
      <DialogContent>
        <form
          className="travel-accommo-form"
          id="accommo-form"
          onSubmit={handleSubmit}
        >
          {validationError ? (
            <span style={{ color: "red", textAlign: "center" }}>
              {"Please fill in all fields."}
            </span>
          ) : null}
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
          <label>
            <span>{"Check In: "}</span>
            <DateTimePicker
              value={checkIn}
              onChange={date => setCheckIn(date)}
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              activeStartDate={
                new Date(
                  props.date.slice(11),
                  currentMonth,
                  props.date.slice(7, 10)
                )
              }
              minDate={
                new Date(
                  props.date.slice(11),
                  currentMonth,
                  props.date.slice(7, 10)
                )
              }
              size={100}
            />
          </label>
          <label>
            <span>{"Check Out: "}</span>
            <DateTimePicker
              value={checkOut}
              onChange={date => setCheckOut(date)}
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              activeStartDate={
                new Date(
                  props.date.slice(11),
                  currentMonth,
                  props.date.slice(7, 10)
                )
              }
              minDate={
                new Date(
                  props.date.slice(11),
                  currentMonth,
                  props.date.slice(7, 10)
                )
              }
              size={100}
            />
          </label>
        </form>
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <StyledButton text="Cancel" handleClick={reset} />
        <StyledButton
          text="Add"
          handleClick={handleSubmit}
          type="submit"
          form="accommo-form"
        />
      </DialogActions>
    </Dialog>
  );
};

export default AccommoForm;
