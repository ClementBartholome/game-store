import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import RoutesConfig from "./RoutesConfig";
import games from "./data";

import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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

  const isInCart = (gameId) => {
    return cartItems.some((item) => item.id === gameId);
  };

  return (
    <Router>
      <AuthProvider>
        <Header />
        <RoutesConfig
          games={games}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cartItems={cartItems}
          isInCart={isInCart}
        />
      </AuthProvider>
    </Router>
  );
}
