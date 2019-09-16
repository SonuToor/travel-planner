import firebase from 'firebase/app';
import { FIREBASE_KEY } from './APIs'
import "firebase/auth";
import "firebase/database";



const config = {
    apiKey: FIREBASE_KEY,
    authDomain: "travel-planner-80285.firebaseapp.com",
    databaseURL: "https://travel-planner-80285.firebaseio.com",
    projectId: "travel-planner-80285",
    storageBucket: 'travel-planner-80285.appspot.com',
    messagingSenderId: "767178993935",
    appId: "1:767178993935:web:9081587c5de57838"
  };

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
