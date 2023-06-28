import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import CartPage from "./components/CartPage";
import games from "./data"; // Importe le fichier data.jsx

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = (gameId) => {
    setCartItems(cartItems.filter((item) => item.id !== gameId));
  };

  const addToCart = (gameId) => {
    const game = games.find((game) => game.id === gameId);
    if (game) {
      if (cartItems.some((item) => item.id === gameId)) {
        // Si le jeu est déjà dans le panier, le retirer
        setCartItems(cartItems.filter((item) => item.id !== gameId));
      } else {
        // Sinon, l'ajouter au panier
        setCartItems([...cartItems, game]);
      }
    }
  };

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/cart">Panier</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomePage
              games={games}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage cartItems={cartItems} removeFromCart={removeFromCart} />
          }
        />
        <Route path="/game/:id" element={<GamePage games={games} />} />
      </Routes>
    </Router>
  );
};

export default App;
