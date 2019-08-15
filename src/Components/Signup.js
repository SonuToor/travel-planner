import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, FormControl, Input, IconButton, InputAdornment, InputLabel} from '@material-ui/core';
import firebase from "../config/Firebase"
import React from 'react';
import './Signup.css'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export default class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            showPassword : false,
            email : '',
            password : '',
            confirm : '',
            isError : false,
            error : null
        }
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword : !this.state.showPassword
        })
    }

    handleChange = (event) => {
        // store the input fields within state
        if (event.target.id === "user-email") {
            this.setState({
                email : event.target.value
            })
        }
        else if (event.target.id === "user-password") {
            this.setState({
                password : event.target.value
            })
        }
        else {
            this.setState({
                confirm : event.target.value
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault(); 

        // first validate the submission
        if (this.state.password !== this.state.confirm) {
            this.setState({
                isError : true,
                error : "Passwords don't match!"
            })
        }
        else if (this.state.password.length < 4) {
            this.setState({
                isError : true,
                error : "Password must be longer than 4 characters"
            })
        }
        // submission is valid 
        else {
            this.setState({
                isError : false,
                errorMessage : null
            })
            // the passwords match and are of the appropriate length, sign user up with firebase authentication

            // TO DO 
                // make sure the sign up authentication below is right according to docs
                // then make sure the sign out function in navigation is correct
                // then make sure you can redirect the user after sign in to the "/home" path
                // then check to make sure the login process is working
                // then give it a go and see if signup ---> log out ----> log in    works as intended 
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.state.email, 
                    this.state.password
                )
                .then(() => {
                    this.props.register(this.state.email);
                    console.log(this.state.email + " has created an account!");
                  })
                .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({
                    // TO DO
                        // now if i set isError to true here, it will display the error message given by firebase
                        // how and when does it get removed?
                    error: errorMessage
                })
              });
        }

    }

    componentDidMount = () => {
        this.props.logOut();
    }

    render() {
        return  (
            <div className="form-background">
                <form className="signup-form" onSubmit={this.handleSubmit}>
                    <h3>Sign Up Now!</h3>
                    {this.state.isError ? <p style={{color : "red", textAlign : "center"}}>{this.state.error}</p> : null}
                    <FormControl>
                        <InputLabel htmlFor="user-email">Enter Email</InputLabel>
                        <Input
                            id="user-email"
                            type="email"
                            required
                            onChange={this.handleChange}
                            value={this.state.email}
                            startAdornment={
                                <InputAdornment position="start">
                                <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="user-password">Enter Password</InputLabel>
                        <Input
                            variant="outlined"
                            id="user-password"
                            required
                            type={this.state.showPassword ? 'text' : 'password'}
                            onChange={this.handleChange}
                            value={this.state.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton 
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}>
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="user-reenterpassword">Reenter Password</InputLabel>
                        <Input
                            variant="outlined"
                            id="user-reenterpassword"
                            required
                            type={this.state.showPassword ? 'text' : 'password'}
                            onChange={this.handleChange}
                            value={this.state.confirm}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton 
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}>
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />          
                    </FormControl>
                    <Button variant="contained" className="signup-button" type="submit" style={{marginTop : "2%"}}>Submit</Button>
                </form>
            </div>
        )
    }
}