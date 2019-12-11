import React from "react";
import { IconButton } from "@material-ui/core";

function TravelIconButton(props) {
  const { icon, label, showForm, value } = props;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <IconButton onClick={() => showForm(value)}>{icon}</IconButton>
      </div>
      <span>{label}</span>
    </div>
  );
}

export default TravelIconButton;
