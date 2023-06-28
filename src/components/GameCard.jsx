import { Link } from "react-router-dom";
import AddToCartButton from "../components/AddToCart";

const GameCard = ({ game, addToCart, removeFromCart, isInCart }) => {
  const { id, title, description, price, cover } = game;

  return (
    <div className="game-card">
      <h2>{title}</h2>
      <img src={cover} alt="Screen"></img>
      <p>{description}</p>
      <p>Prix : {price} €</p>
      <div className="buttons-div">
        <AddToCartButton
          isInCart={isInCart}
          gameId={id}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
        />
        <Link to={`/game/${title.replace(/ /g, "-")}`}>
          Plus d'informations
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd">
            <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
