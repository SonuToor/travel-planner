import React from 'react';
import { FormControl, Input, IconButton, InputAdornment, InputLabel} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            showPassword : false
        }
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword : !this.state.showPassword
        })
    }

    render() {
        return (
            <div>
                <FormControl>
                    <InputLabel htmlFor="user-username">Enter Username</InputLabel>
                    <Input
                        id="user-username"
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
            </div>
        )
    }
}