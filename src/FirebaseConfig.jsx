import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6YNh1TXCUrdaRCwQ-nSqeD17_d_hUf08",
  authDomain: "gamehub-721b3.firebaseapp.com",
  databaseURL:
    "https://gamehub-721b3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gamehub-721b3",
  storageBucket: "gamehub-721b3.appspot.com",
  messagingSenderId: "849360036594",
  appId: "1:849360036594:web:733387cfef3f4b6917666b",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export { app, db };
