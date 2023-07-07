import React, { useEffect, useState, useContext } from "react";
import AddToCartButton from "../components/AddToCart";
import CartContext from "../contexts/CartContext";

function Account() {
  const { removeFromCart, addToCart, isInCart } = useContext(CartContext);

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (gameId) => {
    const updatedWishlist = wishlist.filter((game) => game.id !== gameId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // const addToCartAndUpdate = (gameId) => {
  //   addToCart(gameId);

  //   // Mettre à jour la liste des articles du panier
  //   const updatedCartItems = [...cartItems, { id: gameId }];
  //   setCartItems(updatedCartItems);
  //   localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  // };

  // const removeFromCartAndUpdate = (gameId) => {
  //   removeFromCart(gameId);

  //   // Mettre à jour la liste des articles du panier
  //   const updatedCartItems = cartItems.filter((item) => item.id !== gameId);
  //   setCartItems(updatedCartItems);
  //   localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  // };

  return (
    <main>
      <h1>Ma liste de souhaits</h1>
      {wishlist.length === 0 ? (
        <p>Aucun jeu dans votre liste de souhaits.</p>
      ) : (
        <section className="wishlist">
          {wishlist.map((game) => (
            <article key={game.id} className="item">
              <div className="game-info">
                <h3>{game.title}</h3>
                <p>Prix : {game.price}€</p>
                <AddToCartButton
                  isInCart={isInCart(game.id)}
                  gameId={game.id}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                />
                <button onClick={() => removeFromWishlist(game.id)}>
                  Supprimer de ma wishlist
                </button>
              </div>
              <img src={game.cover} alt="Cover" />
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Account;
