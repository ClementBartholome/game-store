import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import "./sass/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const firebaseConfig = {
  apiKey: "AIzaSyD6YNh1TXCUrdaRCwQ-nSqeD17_d_hUf08",
  authDomain: "gamehub-721b3.firebaseapp.com",
  projectId: "gamehub-721b3",
  storageBucket: "gamehub-721b3.appspot.com",
  messagingSenderId: "849360036594",
  appId: "1:849360036594:web:733387cfef3f4b6917666b",
};

firebase.initializeApp(firebaseConfig);
