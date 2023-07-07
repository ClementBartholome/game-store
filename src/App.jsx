import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import RoutesConfig from "./RoutesConfig";
import games from "./data";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <RoutesConfig games={games} />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
