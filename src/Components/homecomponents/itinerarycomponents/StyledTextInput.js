import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const StyledTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#836529"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#836529"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#836529"
      },
      "&:hover fieldset": {
        borderColor: "#836529"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#836529"
      }
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function StyledTextInput(props) {
  const classes = useStyles();
  const { label, value, updateValue } = props;
  return (
    <StyledTextField
      className={classes.margin}
      label={label}
      value={value}
      onChange={e => updateValue(e.target.value)}
    />
  );
}
