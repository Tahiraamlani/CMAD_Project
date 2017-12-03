import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDitGt-7yyIDiVbWBdbuBvGDCtbC4hKj38",
    authDomain: "bloodapp-7bc9a.firebaseapp.com",
    databaseURL: "https://bloodapp-7bc9a.firebaseio.com",
    projectId: "bloodapp-7bc9a",
    storageBucket: "bloodapp-7bc9a.appspot.com",
    messagingSenderId: "539657427200"
  };
var fb = firebase.initializeApp(config);
export default fb;