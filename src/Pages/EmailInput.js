import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  Input,
  InputAdornment,
  InputLabel,
  FormControl
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

const StyledInput = withStyles({
  underline: {
    borderBottom: "2px solid black",
    "&:after": {
      borderBottom: "2px solid black"
    },
    "&:hover": {
      borderBottom: "2px solid black"
    }
  }
})(Input);

const EmailInput = props => {
  const { value, label, updateValue } = props;
  return (
    <FormControl>
      <InputLabel style={{ color: "black" }}>{label}</InputLabel>
      <StyledInput
        type="email"
        value={value}
        onChange={e => updateValue(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default EmailInput;
