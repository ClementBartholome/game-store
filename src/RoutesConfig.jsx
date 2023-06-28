import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import PageNotFound from "./pages/404";
import CartPage from "./components/CartPage";

const RoutesConfig = ({ games, addToCart, removeFromCart, cartItems }) => {
  return (
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
      <Route path="/game/:name" element={<GamePage games={games} />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/404" element={<PageNotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
