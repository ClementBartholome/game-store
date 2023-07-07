import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GameList from "./pages/GameList";
import GamePage from "./pages/GamePage";
import PageNotFound from "./pages/404";
import CartPage from "./pages/CartPage";
import Account from "./pages/Account";

function RoutesConfig({ games }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage games={games} />} />
      <Route exact path="/explore" element={<GameList />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/game/:name" element={<GamePage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default RoutesConfig;
