import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GameList from "./pages/GameList";
import GamePage from "./pages/GamePage";
import PageNotFound from "./pages/404";
import CartPage from "./pages/CartPage";
import Account from "./pages/Account";

const RoutesConfig = ({
  games,
  addToCart,
  removeFromCart,
  cartItems,
  isInCart,
  handleLogin,
  handleLogout,
  isLoggedIn,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            games={games}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        }
      />
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
          <CartPage
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            games={games}
          />
        }
      />
      <Route
        path="/game/:name"
        element={
          <GamePage
            games={games}
            isInCart={isInCart}
            addToCart={addToCart}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
          />
        }
      />
      <Route
        path="/account"
        element={
          <Account
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            isInCart={isInCart}
          />
        }
      />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
