import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
    apiKey: "AIzaSyCpFwZnD_9t6LWsn1V4IDUDjW-7rkcKSiM",
    authDomain: "finmod-webapp.firebaseapp.com",
    projectId: "finmod-webapp",
    storageBucket: "finmod-webapp.appspot.com",
    messagingSenderId: "1054130185159",
    appId: "1:1054130185159:web:0ba92095c2818726fbefe2",
    measurementId: "G-E3YJGTYJJB"
  };

	// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
