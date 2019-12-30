import { Button } from "@material-ui/core";
import EmailInput from "./EmailInput";
import ExploreIcon from "@material-ui/icons/Explore";
import firebase from "../config/Firebase";
import React, { useEffect, useState } from "react";
import PasswordInput from "./PasswordInput";
import "./Signup.css";

const Signup = props => {
  const [showPassword, toggleShowPassword] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isError, toggleIsError] = useState(false);
  const [error, setError] = useState(null);

  const { register, logOut, route } = props;

  const handleSubmit = event => {
    event.preventDefault();

    // first validate the submission
    if (password !== confirmPass) {
      toggleIsError(true);
      setError("Passwords don't match!");
    }
    // submission is valid
    else {
      toggleIsError(false);
      setError(null);
      // the passwords match, sign user up with firebase authentication
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          register();
          props.history.push(route);
          console.log(response.user.email + " has created an account!");
        })
        .catch(error => {
          // display errors if sign up fails
          var errorMessage = error.message;
          toggleIsError(false);
          setError(errorMessage);
        });
    }
  };

  useEffect(() => {
    logOut();
  }, []);

  return (
    <div className="form-background">
      <ExploreIcon />
      <form className="signup-form" onSubmit={handleSubmit}>
        {isError ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : null}
        <EmailInput value={email} updateValue={setEmail} label="Enter Email" />
        <PasswordInput
          value={password}
          updateValue={setPassword}
          label="Enter Password"
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        <PasswordInput
          value={confirmPass}
          updateValue={setConfirmPass}
          label="Reenter Password"
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        <Button
          variant="contained"
          className="signup-button"
          type="submit"
          style={{ marginTop: "10%", marginBottom: "5%" }}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
