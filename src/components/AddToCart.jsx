import React, { useState } from "react";

const AddToCartButton = ({ isInCart, gameId, removeFromCart, addToCart }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCartClick = () => {
    setIsAnimating(true);
    if (isInCart) {
      removeFromCart(gameId);
    } else {
      addToCart(gameId);
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <button
      onClick={handleCartClick}
      className={isAnimating ? "cart-button-animation" : ""}>
      {isInCart ? "Retirer du panier" : "Ajouter au panier"}
    </button>
  );
};

export default AddToCartButton;
