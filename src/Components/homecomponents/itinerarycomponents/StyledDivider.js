import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

const StyledDiv = withStyles({
  root: {
    backgroundColor: "#836529",
    border: "solid",
    height: "auto",
    borderWidth: "thin",
    borderColor: "#836529"
  }
})(Divider);

const StyledDivider = () => {
  return <StyledDiv />;
};

export default StyledDivider;
