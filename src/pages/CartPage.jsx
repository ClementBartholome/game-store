import React from "react";
import CartItem from "../components/CartItem";

const CartPage = ({ cartItems, removeFromCart, games }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <main className="cart">
      <h1>Mon panier</h1>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          <>
            <section className="cart-items">
              {cartItems.map((item) => {
                const game = games.find((game) => game.id === item.id);
                return (
                  <div className="cart-item" key={item.id}>
                    <CartItem item={item} removeFromCart={removeFromCart} />
                    <img src={game.cover} alt={game.title} />
                  </div>
                );
              })}
            </section>
            <section className="checkout">
              <div className="cart-summary">
                <h3>Résumé</h3>
                <p>Total à payer : {total} €</p>
                <button className="checkout-button">Aller au paiement</button>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default CartPage;
