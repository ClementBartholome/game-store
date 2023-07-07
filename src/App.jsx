import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import RoutesConfig from "./RoutesConfig";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <RoutesConfig />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
