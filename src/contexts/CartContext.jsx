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
          const userCartRef = db.collection("carts").doc(user.uid); // Reference the user's cart in the "carts" collection
          const cartSnapshot = await userCartRef.collection("cartItems").get(); // Fetch the cart items from the "cartItems" subcollection
          const cartData = cartSnapshot.docs.map((doc) => doc.data()); // Extract the cart item data from the snapshot
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
        const gamesSnapshot = await db.collection("games").get(); // Fetch the games from the "games" collection
        const gamesData = gamesSnapshot.docs.map((doc) => doc.data()); // Extract the game data from the snapshot
        gamesData.sort((a, b) => b.id - a.id); // Sort the games by ID in descending order
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games from Firestore:", error);
      }
    };

    fetchGames();
  }, []);

  // Add a game to the user's cart
  const addToCart = async (gameId) => {
    const game = games.find((game) => game.id === gameId); // Find the game with the matching ID
    if (game && user) {
      try {
        const userCartRef = db.collection("carts").doc(user.uid); // Reference the user's cart in the "carts" collection
        await userCartRef.collection("cartItems").add(game); //  Add the game to the "cartItems" subcollection
        setCartItems([...cartItems, game]);
      } catch (error) {
        console.error("Error adding game to cart in Firestore:", error);
      }
    } else {
      setCartItems([...cartItems, game]);
    }
  };

  // Remove a game from the user's cart
  const removeFromCart = async (gameId) => {
    if (user) {
      try {
        const userCartRef = db.collection("carts").doc(user.uid); // Reference the user's cart in the "carts" collection
        const cartItemQuery = await userCartRef // Query the "cartItems" subcollection for the game with the matching ID
          .collection("cartItems")
          .where("id", "==", gameId) // Query the "cartItems" subcollection for the game with the matching ID
          .limit(1) // Limit the query to 1 result
          .get();

        if (!cartItemQuery.empty) {
          // If the query returned a result, delete the document
          const cartItemDoc = cartItemQuery.docs[0];
          await cartItemDoc.ref.delete();

          setCartItems(cartItems.filter((item) => item.id !== gameId));
        }
      } catch (error) {
        console.error("Error removing game from cart in Firestore:", error);
      }
    } else {
      setCartItems(cartItems.filter((item) => item.id !== gameId));
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
