import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import RoutesConfig from "./RoutesConfig";
import games from "./data";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = (gameId) => {
    setCartItems(cartItems.filter((item) => item.id !== gameId));
  };

  const addToCart = (gameId) => {
    const game = games.find((game) => game.id === gameId);
    if (game) {
      if (cartItems.some((item) => item.id === gameId)) {
        setCartItems(cartItems.filter((item) => item.id !== gameId));
      } else {
        setCartItems([...cartItems, game]);
      }
    }
  };

  return (
    <Router>
      <Header />
      <RoutesConfig
        games={games}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cartItems={cartItems}
      />
    </Router>
  );
};

export default App;
