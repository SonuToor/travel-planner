import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, FormControl, Input, IconButton, InputAdornment, InputLabel} from '@material-ui/core';
import firebase from "../config/Firebase"
import './Login.css'
import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            showPassword : false,
            email : '',
            password : ''
        }
    }

    handleChange = (event) => {
        if (event.target.id === "user-email") {
            this.setState({
                email : event.target.value
            })
        }
        else {
            this.setState({
                password : event.target.value
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //   });
    }

    componentDidMount = () => {
        this.props.logOut();    
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword : !this.state.showPassword
        })
    }

    render() {
        return (
            <div className="form-background">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <h3>Login</h3>
                    <FormControl>
                        <InputLabel htmlFor="user-email">Enter Email</InputLabel>
                        <Input
                            id="user-email"
                            type="email"
                            onChange={this.handleChange}
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
                            type={this.state.showPassword ? 'text' : 'password'}
                            onChange={this.handleChange}
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
                    <Button variant="contained" className="login-button" type="submit" style={{marginTop : "2%"}}>Submit</Button>
                </form>
            </div>
        )
    }
}