import AccommoForm from "./AccommoForm";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import Flight from "@material-ui/icons/Flight";
import LocalHotel from "@material-ui/icons/LocalHotel";
import React, { useEffect, useState } from "react";
import TravelIconButton from "./TravelIconButton";
import TrainIcon from "@material-ui/icons/Train";
import TransportForm from "./TransportForm";
import "./TravelAndAccommoInput.css";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    color: "#836529",
    fontWeight: "bold",
    backgroundColor: "#f0f1f2"
  }
});

export default function TravelAndAccommoInput(props) {
  const [formType, setFormType] = useState("");
  const [openAccommoForm, toggleAccommoForm] = useState(false);
  const [openTransportForm, toggleTransportForm] = useState(false);

  useEffect(() => {
    if (formType === "Accommo") {
      toggleAccommoForm(true);
    }
    if (formType === "Flight" || formType === "Train") {
      toggleTransportForm(true);
    }
  }, [formType]);

  const classes = useStyles();

  return (
    <div className="sticky-footer">
      <Card className={classes.card} elevation={3}>
        <div className="accommodation-travel-input">
          <TravelIconButton
            icon={<Flight />}
            value="Flight"
            label="Add a Flight"
            setForm={setFormType}
          />
          <TravelIconButton
            icon={<LocalHotel />}
            value="Accommo"
            label="Add Accommodation"
            setForm={setFormType}
          />
          <TravelIconButton
            icon={<TrainIcon />}
            value="Train"
            label="Add a Train"
            setForm={setFormType}
          />
          <TravelIconButton
            icon={<DirectionsCarIcon />}
            value="Car"
            label="Add a Rental Car"
            setForm={setFormType}
          />
        </div>
      </Card>
      <AccommoForm
        open={openAccommoForm}
        close={() => toggleAccommoForm(false)}
      />
      <TransportForm
        transport={formType}
        open={openTransportForm}
        close={() => toggleTransportForm(false)}
      />
    </div>
  );
}
