import React from "react";
import { useParams } from "react-router-dom";

const GamePage = ({ games }) => {
  const { id } = useParams();
  const game = games.find((game) => game.id === parseInt(id));

  if (!game) {
    return <div>Le jeu demandé n'existe pas.</div>;
  }

  const { title, description, images } = game;

  return (
    <main className="gamepage">
      <h2>{title}</h2>
      <p>{description}</p>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`${title} screen ${index}`} />
      ))}
    </main>
  );
};

export default GamePage;
