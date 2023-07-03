import React from "react";
import { useParams } from "react-router-dom";
import Carrousel from "../components/Carrousel";
import Collapse from "../components/Collapse";
import AddToCartButton from "../components/AddToCart";

const GamePage = ({ games, cartItems, handleCartClick, removeFromCart }) => {
  const { name } = useParams();
  const game = games.find((game) => game.title === name.replace(/-/g, " "));

  if (!game) {
    return <div>Le jeu demandé n'existe pas.</div>;
  }

  const { title, description, fulldescription, images, specs, id } = game;

  const specsLabels = {
    link: "Site officiel :",
    release: "Date de sortie :",
    developer: "Développeur :",
    publisher: "Éditeur :",
  };

  const specsList = Object.entries(specs).map(([key, value]) => (
    <li key={key}>
      <strong>{specsLabels[key]}</strong> {value}
    </li>
  ));

  const isInCart = cartItems.some((item) => item.gameId === id);

  return (
    <main className="gamepage">
      <div className="gamepage-container">
        {images && images.length > 0 ? (
          <Carrousel images={images.map((image) => image)} />
        ) : (
          <div>Aucune image disponible.</div>
        )}
        <section className="game-info">
          <div className="game-title">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <Collapse title="Détails" content={<ul>{specsList}</ul>} />
          <AddToCartButton
            isInCart={isInCart}
            gameId={id} // Utilisez "id" au lieu de "game.id"
            removeFromCart={removeFromCart}
            addToCart={handleCartClick}
          />
        </section>
        <section className="game-description">
          <h2>Description</h2>
          {fulldescription.split("\n").map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              <br />
            </React.Fragment>
          ))}
        </section>
      </div>
    </main>
  );
};

export default GamePage;
