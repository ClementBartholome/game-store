import React from "react";

const CartItem = ({ item, removeFromCart }) => {
  const { id, title, price } = item;

  return (
    <div>
      <h3>{title}</h3>
      <p>Prix : {price} €</p>
      <button onClick={() => removeFromCart(id)}>Supprimer du panier</button>
    </div>
  );
};

export default CartItem;
