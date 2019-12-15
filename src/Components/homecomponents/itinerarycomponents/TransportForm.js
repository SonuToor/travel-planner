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

const TransportForm = props => {
  const currentMonth = monthStringToNum(props.date.slice(3, 7));
  const [ticket, setTicket] = useState("");
  const [departsFrom, setDepartsFrom] = useState("");
  const [departDateTime, setDepartDateTime] = useState(
    new Date(props.date.slice(11), currentMonth, props.date.slice(7, 10))
  );
  const [destination, setDestination] = useState("");
  const [validationError, toggleValidationError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    console.log("submitted");
    console.log(
      departDateTime.toString().slice(16, 21),
      departDateTime.toDateString()
    );
    if (destination === "" || departDateTime === "") {
      toggleValidationError(true);
      return;
    }
    toggleValidationError(false);
    console.log(ticket, departsFrom, departDateTime, destination);
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
      <DialogTitle id="form-dialog-title">
        {!props.transport ? null : `Add a ${props.transport}`}
      </DialogTitle>
      <DialogContent>
        <form className="travel-accommo-form" onSubmit={handleSubmit}>
          {validationError ? (
            <span style={{ color: "red", textAlign: "center" }}>
              {"Please fill in all fields."}
            </span>
          ) : null}
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
          <label>
            <span>{"Departs at: "}</span>
            <DateTimePicker
              value={departDateTime}
              onChange={date => setDepartDateTime(date)}
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
        <StyledButton text="Submit" handleClick={handleSubmit} type="submit" />
      </DialogActions>
    </Dialog>
  );
};

export default TransportForm;
