import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import RoutesConfig from "./RoutesConfig";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { GamesProvider } from "./contexts/GamesContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <GamesProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <RoutesConfig />
            </WishlistProvider>
          </CartProvider>
        </GamesProvider>
      </AuthProvider>
    </Router>
  );
}
