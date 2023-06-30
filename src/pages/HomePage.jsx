import React from "react";
import Hero from "../images/hero.svg";

export default function HomePage() {
  return (
    <main className="homepage">
      <div className="hero">
        <div className="left-container">
          <p>Découvrez vos prochains jeux préférés</p>
          <h1>Game Hub</h1>
        </div>
        <div className="right-container">
          <img src={Hero} alt="Video Games"></img>
        </div>
      </div>
      <div className="trending">
        <h2>Jeux du moment</h2>
        <button>Voir plus</button>
      </div>
    </main>
  );
}
