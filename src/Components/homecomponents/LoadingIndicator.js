import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const StyledProgress = withStyles({
  colorPrimary: { color: "rgba(131, 101, 41, 0.877)" }
})(CircularProgress);

const LoadingIndicator = () => {
  return <StyledProgress />;
};

export default LoadingIndicator;
