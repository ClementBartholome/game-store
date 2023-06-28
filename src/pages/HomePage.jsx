import React from "react";
import GameCard from "../components/GameCard";

const HomePage = ({ games, addToCart, removeFromCart, cartItems }) => {
  return (
    <main className="homepage">
      <h1>Jeux disponibles</h1>
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          isInCart={cartItems.some((item) => item.id === game.id)}
        />
      ))}
    </main>
  );
};

export default HomePage;
