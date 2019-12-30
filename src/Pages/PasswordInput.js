import {
  Input,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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

const PasswordInput = props => {
  const { value, label, updateValue, showPassword, toggleShowPassword } = props;

  const hidePassword = () => {
    toggleShowPassword(!showPassword);
  };

  return (
    <FormControl style={{ marginTop: "5%", marginBottom: "5%" }}>
      <InputLabel style={{ color: "black" }}>{label}</InputLabel>
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
