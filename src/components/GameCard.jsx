import { Link } from "react-router-dom";

const GameCard = ({ game, addToCart, removeFromCart, isInCart }) => {
  const { id, title, description, price, images } = game;

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <img src={images[0]} alt="Screen"></img>
      <p>{description}</p>
      <p>Prix : {price} €</p>
      <button onClick={handleCartClick}>
        {isInCart ? "Retirer du panier" : "Ajouter au panier"}
      </button>
      <Link to={`/game/${id}`}>Voir plus</Link>
    </div>
  );
};

export default GameCard;
