import AccommoForm from "./AccommoForm";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import Flight from "@material-ui/icons/Flight";
import LocalHotel from "@material-ui/icons/LocalHotel";
import React, { useState } from "react";
import TravelIconButton from "./TravelIconButton";
import TrainIcon from "@material-ui/icons/Train";
import TransportForm from "./TransportForm";
import "./TravelAndAccommoInput.css";

export default function TravelAndAccommoInput(props) {
  const [formType, setFormType] = useState("");
  const [showForm, toggleShowForm] = useState(false);
  const [showTransportForm, toggleTransportForm] = useState(false);
  const [showAccommodationForm, toggleAccommodationForm] = useState(false);

  const renderForm = value => {
    setFormType(value);
    toggleShowForm(true);
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
          {formType === "Flight" || formType === "Train" ? (
            <TransportForm transport={formType} cancel={toggleShowForm} />
          ) : null}
          {formType === "Accommo" ? (
            <AccommoForm cancel={toggleShowForm} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
