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
    // toggle between showing and hiding password 
    handleClickShowPassword = () => {
        this.setState({
            showPassword : !this.state.showPassword
        })
    }
    // store the input fields within state
    handleChange = (event) => {
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
        // submission is valid 
        else {
            this.setState({
                isError : false,
                errorMessage : null
            })
            // the passwords match, sign user up with firebase authentication
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    this.props.register(response.user.email);
                    this.props.history.push(this.props.route)
                    console.log(response.user.email + " has created an account!");
                  })
                  .catch((error) => {
                    // display errors if sign up fails 
                    var errorMessage = error.message;
                    this.setState({
                        isError : true,
                        error : errorMessage
                    })
                  })
                
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