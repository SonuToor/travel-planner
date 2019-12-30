import { Button } from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";
import firebase from "../config/Firebase";
import "./Login.css";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import React, { useEffect, useState } from "react";

// this component renders and logs in users to the App
const Login = props => {
  const [showPassword, toggleShowPassword] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, toggleIsError] = useState(false);
  const [error, setError] = useState(null);

  const { login, logOut, route } = props;

  const handleSubmit = event => {
    event.preventDefault();
    // remove any existing error messages
    toggleIsError(false);
    setError(null);
    // use fire base authentication to log user in
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        login();
        props.history.push(route);
        console.log(response.user.email + " has logged in!");
      })
      .catch(error => {
        // display any errors if authentication fails
        var errorMessage = error.message;
        setError(errorMessage);
        toggleIsError(true);
      });
  };

  useEffect(() => {
    logOut();
  }, []);

  return (
    <div className="form-background-login">
      <ExploreIcon />
      <form className="login-form" onSubmit={handleSubmit}>
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
        <Button
          variant="contained"
          className="login-button"
          type="submit"
          style={{ marginTop: "10%", marginBottom: "5%" }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
