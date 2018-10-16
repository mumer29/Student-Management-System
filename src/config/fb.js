import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyB1ZJSnJbciNTobPG_EPf1Rbn9jtXKWm0M",
    authDomain: "student-info-react-app.firebaseapp.com",
    databaseURL: "https://student-info-react-app.firebaseio.com",
    projectId: "student-info-react-app",
    storageBucket: "student-info-react-app.appspot.com",
    messagingSenderId: "148289093543"
  };
  firebase.initializeApp(config);