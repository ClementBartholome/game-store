import { createContext, useEffect, useState } from "react";
import games from "../data";

const CartContext = createContext();

export default CartContext;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

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
