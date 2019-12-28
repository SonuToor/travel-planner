import {
  Input,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const StyledInput = withStyles({
  underline: {
    borderBottom: "2px solid rgb(105, 55, 161)",
    "&:after": {
      // The MUI source seems to use this but it doesn't work
      borderBottom: "2px solid rgb(105, 55, 161)"
    }
  },
  formControl: {
    color: "rgb(105, 55, 161)"
  },
  focused: {
    color: "rgb(105, 55, 161)"
  }
})(Input);

const PasswordInput = props => {
  const { value, label, updateValue, showPassword, toggleShowPassword } = props;

  const hidePassword = () => {
    toggleShowPassword(!showPassword);
  };

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <StyledInput
        variant="outlined"
        type={showPassword ? "text" : "password"}
        onChange={e => updateValue(e.target.value)}
        value={value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={hidePassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordInput;
