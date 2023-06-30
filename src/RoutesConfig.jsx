import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GameList from "./pages/GameList";
import GamePage from "./pages/GamePage";
import PageNotFound from "./pages/404";
import CartPage from "./pages/CartPage";

const RoutesConfig = ({
  games,
  addToCart,
  removeFromCart,
  cartItems,
  isInCart,
}) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        exact
        path="/explore"
        element={
          <GameList
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
      <Route
        path="/game/:name"
        element={
          <GamePage
            games={games}
            isInCart={isInCart}
            handleCartClick={addToCart}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
          />
        }
      />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/404" element={<PageNotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
