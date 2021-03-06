import firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCp1IC6FLXgEaJOmylBgvMq1jk5HHCuTb8",
    authDomain: "letmeask-bruno.firebaseapp.com",
    databaseURL: "https://letmeask-bruno-default-rtdb.firebaseio.com",
    projectId: "letmeask-bruno",
    storageBucket: "letmeask-bruno.appspot.com",
    messagingSenderId: "218559931738",
    appId: "1:218559931738:web:1ef141c3852bc5fda63f63"
  }

  firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database } 