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
    <div className="game-card">
      <h2>{title}</h2>
      <img src={images[0]} alt="Screen"></img>
      <p>{description}</p>
      <p>Prix : {price} €</p>
      <div className="buttons-div">
        <button onClick={handleCartClick}>
          {isInCart ? "Retirer du panier" : "Ajouter au panier"}
        </button>
        <Link to={`/game/${title.replace(/ /g, "-")}`}>Voir plus</Link>
      </div>
    </div>
  );
};

export default GameCard;
