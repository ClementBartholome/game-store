import React, { useContext } from "react";
import AddToCartButton from "../components/AddToCart";
import CartContext from "../contexts/CartContext";
import WishlistContext from "../contexts/WishlistContext";

function Account() {
  const { removeFromCart, addToCart, isInCart } = useContext(CartContext);
  const { removeFromWishlist, wishlist } = useContext(WishlistContext);

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
