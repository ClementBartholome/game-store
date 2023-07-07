import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../FirebaseConfig";
import AuthContext from "./AuthContext";

const CartContext = createContext();

export default CartContext;

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [games, setGames] = useState([]);

  // Fetch cart items from Firestore when the user changes
  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        try {
          const userCartRef = db.collection("carts").doc(user.uid);
          const cartSnapshot = await userCartRef.collection("cartItems").get();
          const cartData = cartSnapshot.docs.map((doc) => doc.data());
          setCartItems(cartData);
        } catch (error) {
          console.error("Error fetching cart items from Firestore:", error);
        }
      } else {
        setCartItems([]);
      }
    };

    fetchCartItems();
  }, [user]);

  // Fetch games from Firestore
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesSnapshot = await db.collection("games").get();
        const gamesData = gamesSnapshot.docs.map((doc) => doc.data());
        gamesData.sort((a, b) => b.id - a.id);
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games from Firestore:", error);
      }
    };

    fetchGames();
  }, []);

  // Add a game to the user's cart
  const addToCart = async (gameId) => {
    const game = games.find((game) => game.id === gameId);
    if (game && user) {
      try {
        const userCartRef = db.collection("carts").doc(user.uid);
        await userCartRef.collection("cartItems").add(game);
        setCartItems([...cartItems, game]);
      } catch (error) {
        console.error("Error adding game to cart in Firestore:", error);
      }
    }
  };

  // Remove a game from the user's cart
  const removeFromCart = async (gameId) => {
    if (user) {
      try {
        const userCartRef = db.collection("carts").doc(user.uid);
        const cartItemQuery = await userCartRef
          .collection("cartItems")
          .where("id", "==", gameId)
          .limit(1)
          .get();

        if (!cartItemQuery.empty) {
          const cartItemDoc = cartItemQuery.docs[0];
          await cartItemDoc.ref.delete();

          setCartItems(cartItems.filter((item) => item.id !== gameId));
        }
      } catch (error) {
        console.error("Error removing game from cart in Firestore:", error);
      }
    }
  };

  // Check if a game is already in the user's cart
  const isInCart = (gameId) => {
    return cartItems.some((item) => item.id === gameId);
  };

  // Provide the cart context value to child components
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
