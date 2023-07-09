import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../FirebaseConfig";
import AuthContext from "./AuthContext";
import CartContext from "./CartContext";

const WishlistContext = createContext();

export default WishlistContext;

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const { games } = useContext(CartContext);

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (user) {
        try {
          const userWishlistRef = db.collection("wishlists").doc(user.uid);
          const wishlishtSnapshot = await userWishlistRef
            .collection("wishlistItems")
            .get();
          const wishlistData = wishlishtSnapshot.docs.map((doc) => doc.data());
          setWishlist(wishlistData);
        } catch (error) {
          console.error("Error fetching wishlist items from Firestore:", error);
        }
      } else {
        setWishlist([]);
      }
    };

    fetchWishlistItems();
  }, [user]);

  const addToWishlist = async (gameId) => {
    const game = games.find((game) => game.id === gameId); // Find the game with the matching ID
    if (game && user) {
      try {
        const userWishlistRef = db.collection("wishlists").doc(user.uid); // Reference the user's wishlist in the "wishlists" collection
        await userWishlistRef.collection("wishlistItems").add(game); //  Add the game to the "wishlistItems" subcollection
        setWishlist([...wishlist, game]);
      } catch (error) {
        console.error("Error adding game to wishlist in Firestore:", error);
      }
    } else {
      setWishlist([...wishlist, game]);
    }
  };

  // Remove a game from the user's wishlist
  const removeFromWishlist = async (gameId) => {
    if (user) {
      try {
        console.log("clicked");
        const userWishlistRef = db.collection("wishlists").doc(user.uid); // Reference the user's wishlist in the "wishlists" collection
        const wishlistItemQuery = await userWishlistRef // Query the "wishlist" subcollection for the game with the matching ID
          .collection("wishlistItems")
          .where("id", "==", gameId) // Query the "wishlist" subcollection for the game with the matching ID
          .limit(1) // Limit the query to 1 result
          .get();

        if (!wishlistItemQuery.empty) {
          // If the query returned a result, delete the document
          const wishlistItemDoc = wishlistItemQuery.docs[0];
          await wishlistItemDoc.ref.delete();

          setWishlist(wishlist.filter((item) => item.id !== gameId));
        }
      } catch (error) {
        console.error("Error removing game from wishlist in Firestore:", error);
      }
    } else {
      setWishlist(wishlist.filter((item) => item.id !== gameId));
    }
  };

  // Check if a game is already in the user's wishlist
  const isInWishlist = (gameId) => {
    return wishlist.some((item) => item.id === gameId);
  };

  // Provide the wishlist context value to child components
  const wishlistContextValue = {
    removeFromWishlist,
    isInWishlist,
    addToWishlist,
    wishlist,
    games,
  };

  return (
    <WishlistContext.Provider value={wishlistContextValue}>
      {children}
    </WishlistContext.Provider>
  );
}
