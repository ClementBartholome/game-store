import { Link } from "react-router-dom";
import AddToCartButton from "../components/AddToCart";

function GameCard({
  game,
  addToCart,
  removeFromCart,
  isInCart,
  user,
  wishlist,
  handleWishlistClick,
}) {
  const { id, title, description, price, cover } = game;

  const isInWishlist = wishlist.some((game) => game.id === id);

  const handleWishlistButtonClick = () => {
    handleWishlistClick(id);
  };

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
        {user && (
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`wishlist-icon ${isInWishlist ? "wishlist-active" : ""}`}
            onClick={handleWishlistButtonClick}>
            <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"></path>
          </svg>
        )}
        <Link to={`/game/${title.replace(/ /g, "-")}`}>
          Plus d'informations
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default GameCard;
