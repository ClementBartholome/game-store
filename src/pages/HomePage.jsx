import React from "react";
import Hero from "../images/hero.svg";
import Carrousel from "../components/Carrousel";
import { Link } from "react-router-dom";

export default function HomePage({ games }) {
  const gameCovers = games.slice(0, 6).map((game) => game.cover);

  return (
    <main className="homepage">
      <div className="hero">
        <div className="left-container">
          <p>Découvrez vos prochains jeux préférés</p>
          <h1>Game Hub</h1>
          <div className="register-buttons">
            <button className="login">Connexion</button>
            <button className="register">Inscription</button>
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
