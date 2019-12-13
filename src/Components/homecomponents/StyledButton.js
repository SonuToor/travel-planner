import React from "react";
import { Button } from "@material-ui/core";

const StyledButton = props => {
  const { text, handleClick } = props;
  return (
    <Button
      onClick={handleClick}
      style={{ color: "white", backgroundColor: "#836529" }}
    >
      {text}
    </Button>
  );
};

export default StyledButton;
