import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  Input,
  InputAdornment,
  InputLabel,
  FormControl
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";

const EmailInput = props => {
  const { value, label, updateValue } = props;
  return (
    <FormControl>
      <InputLabel htmlFor="user-email">{label}</InputLabel>
      <Input
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
