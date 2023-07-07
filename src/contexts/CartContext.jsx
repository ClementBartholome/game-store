import { createContext, useEffect, useState } from "react";
import { db } from "../FirebaseConfig";

const CartContext = createContext();

export default CartContext;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [games, setGames] = useState([]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // get all games from "games" collection in Firebase DB
        const gamesSnapshot = await db.collection("games").get();
        const gamesData = gamesSnapshot.docs.map((doc) => doc.data());
        // sort games by id in descending order
        gamesData.sort((a, b) => b.id - a.id);
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games from Firestore:", error);
      }
    };

    fetchGames();
  }, []);

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

  const cartContextValue = {
    removeFromCart,
    isInCart,
    addToCart,
    cartItems,
    games,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}
