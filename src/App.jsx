import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import RoutesConfig from "./RoutesConfig";
import games from "./data";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const App = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, [isLoggedIn]);

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

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <RoutesConfig
        games={games}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cartItems={cartItems}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        isInCart={isInCart}
      />
    </Router>
  );
};

export default App;
