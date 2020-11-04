import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCkiD86lJPKW4E2MPI3ov5ewY9bl-I60AU",
    authDomain: "in-depth-react-1-c1024.firebaseapp.com",
    databaseURL: "https://in-depth-react-1-c1024.firebaseio.com",
    projectId: "in-depth-react-1-c1024",
    storageBucket: "in-depth-react-1-c1024.appspot.com",
    messagingSenderId: "1014245992779",
    appId: "1:1014245992779:web:5364d6a898a3a7556020ce"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;