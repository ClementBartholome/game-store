import React, { useState, useEffect } from "react";
import Hero from "../images/hero.svg";
import Carrousel from "../components/Carrousel";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function HomePage({ games }) {
  const gameCovers = games.slice(0, 6).map((game) => game.cover);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="homepage">
      <div className="hero">
        <div className="left-container">
          <p>Découvrez vos prochains jeux préférés</p>
          <h1>Game Hub</h1>
          <div className="register-buttons">
            {isLoggedIn ? (
              <button className="logout" onClick={handleLogout}>
                Déconnexion
              </button>
            ) : (
              <>
                <button className="login" onClick={handleLogin}>
                  Connexion
                </button>
                <button className="register">Inscription</button>
              </>
            )}
          </div>
        </div>
        <div className="right-container">
          <img src={Hero} alt="Video Games"></img>
        </div>
      </div>
      <div className="trending">
        <h2>Jeux du moment</h2>
        <Link to="/explore">
          <button>Voir plus</button>
        </Link>
      </div>
      <Carrousel images={gameCovers} />
    </main>
  );
}
