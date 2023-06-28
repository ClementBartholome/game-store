import React from "react";
import CartItem from "../components/CartItem";

const CartPage = ({ cartItems, removeFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h1>Panier</h1>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
      ))}
      <p>Total à payer : {total} €</p>
    </div>
  );
};

export default CartPage;
