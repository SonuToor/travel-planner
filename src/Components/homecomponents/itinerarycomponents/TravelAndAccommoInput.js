import AccommoForm from "./AccommoForm";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import Flight from "@material-ui/icons/Flight";
import LocalHotel from "@material-ui/icons/LocalHotel";
import React, { useEffect, useState } from "react";
import TravelIconButton from "./TravelIconButton";
import TrainIcon from "@material-ui/icons/Train";
import TransportForm from "./TransportForm";
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
    if (formType === "Flight" || formType === "Train" || formType === "Bus") {
      toggleTransportForm(true);
    }
  }, [formType]);

  const closeModal = () => {
    toggleAccommoForm(false);
    toggleTransportForm(false);
    setFormType("");
  };

  const classes = useStyles();

  return (
    <div className="sticky-footer">
      <Card className={classes.card} elevation={3}>
        <div className="accommodation-travel-input">
          <TravelIconButton
            icon={<LocalHotel />}
            value="Accommo"
            label="Add Accommodation"
            setForm={setFormType}
          />
          <TravelIconButton
            icon={<DirectionsBusIcon />}
            value="Bus"
            label="Add a Bus"
            setForm={setFormType}
          />
          <TravelIconButton
            icon={<Flight />}
            value="Flight"
            label="Add a Flight"
            setForm={setFormType}
          />
          <TravelIconButton
            icon={<TrainIcon />}
            value="Train"
            label="Add a Train"
            setForm={setFormType}
          />
        </div>
      </Card>
      <AccommoForm
        open={openAccommoForm}
        date={props.startDate}
        close={closeModal}
      />
      <TransportForm
        transport={formType}
        open={openTransportForm}
        date={props.startDate}
        close={closeModal}
      />
    </div>
  );
}
