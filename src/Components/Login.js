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
            password : '',
            isError : false,
            error : null
        }
    }
    // store the input fields within state
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
        // remove any existing error messages
        this.setState({
            isError : false,
            error : null
        })
        // use fire base authentication to log user in
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                this.props.login(response.user.email)
                this.props.history.push(this.props.route)
                console.log(response.user.email + " has logged in!");
            })
            .catch((error) => {
                // display any errors if authentication fails
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({
                    isError : true,
                    error : errorMessage
                })
              })
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
                    {this.state.isError ? <p style={{color : "red", textAlign : "center"}}>{this.state.error}</p> : null}
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