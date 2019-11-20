// import firebase from '../config/Firebase'; 
import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
    const [user, updateUser] = useState('')
    return (
        <UserContext.Provider value={[user, updateUser]}>
            {props.children}
        </UserContext.Provider>
    );
}