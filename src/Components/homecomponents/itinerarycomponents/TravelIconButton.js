import React from "react";
import { IconButton } from "@material-ui/core";

function TravelIconButton(props) {
  const { icon, label, setForm, value } = props;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <IconButton onClick={() => setForm(value)}>{icon}</IconButton>
      </div>
      <span>{label}</span>
    </div>
  );
}

export default TravelIconButton;
