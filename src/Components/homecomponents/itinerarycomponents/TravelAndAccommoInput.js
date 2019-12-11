import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import Flight from "@material-ui/icons/Flight";
import IndividualAvatarInputs from "./IndividualAvatarInputs";
import LocalHotel from "@material-ui/icons/LocalHotel";
import React, { useState } from "react";
import TravelIconButton from "./TravelIconButton";
import TrainIcon from "@material-ui/icons/Train";
import "./TravelAndAccommoInput.css";

export default function TravelAndAccommoInput(props) {
  const [showForm, toggleShowForm] = useState(false);
  const [form, setForm] = useState("");

  const renderForm = value => {
    setForm(value);
    // now render the appropriate form based on the value received
    toggleShowForm(true);
    // return <p>{`${value}form ting innit`}</p>
  };

  return (
    <div>
      <div className="accommodation-travel-input">
        <TravelIconButton
          icon={<Flight />}
          value="Flight"
          label="Add a Flight"
          showForm={renderForm}
        />
        <TravelIconButton
          icon={<LocalHotel />}
          value="Accommo"
          label="Add Accommodation"
          showForm={renderForm}
        />
        <TravelIconButton
          icon={<TrainIcon />}
          value="Train"
          label="Add a Train"
          showForm={renderForm}
        />
        <TravelIconButton
          icon={<DirectionsCarIcon />}
          value="Car"
          label="Add a Rental Car"
          showForm={renderForm}
        />
      </div>
      {showForm ? (
        <div className="form-display">
          {/* {renderForm()} */}
          <span>{`${form}form ting innit`}</span>
          {/* {(form === 'Train' || 'Flight')} */}
        </div>
      ) : null}
    </div>
  );
}
