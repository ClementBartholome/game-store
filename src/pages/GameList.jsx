import React, { useState, useContext } from "react";
import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";
import WishlistContext from "../contexts/WishlistContext";

function GameList() {
  const { user } = useContext(AuthContext);
  const { games, addToCart, removeFromCart, cartItems } =
    useContext(CartContext);
  const { removeFromWishlist, wishlist, addToWishlist } =
    useContext(WishlistContext);

  const [searchGame, setSearchGame] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const handleWishlistClick = (gameId) => {
    if (wishlist.some((game) => game.id === gameId)) {
      removeFromWishlist(gameId); // Remove game from wishlist
    } else {
      addToWishlist(gameId); // Add game to wishlist
    }
  };

  const handleSearchChange = (event) => {
    setSearchGame(event.target.value);
  };

  const tags = games.reduce((allTags, game) => {
    game.tags.forEach((tag) => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
    return allTags;
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleResetFilters = () => {
    setSelectedTag(null);
  };

  const filteredGames = games.filter((game) => {
    const titleMatch = game.title
      .toLowerCase()
      .includes(searchGame.toLowerCase());
    const tagMatch = selectedTag ? game.tags.includes(selectedTag) : true;
    return titleMatch && tagMatch;
    // titleMatch checks if the search text is included in the game's title
    // tagMatch checks if the selectedTag is included in the game's tags. If no tag is selected, tagMatch = true, so all games are included
  });

  return (
    <main className="homepage">
      <h1>Jeux du moment</h1>
      <div className="search-div">
        <input
          type="text"
          placeholder="Rechercher un jeu..."
          value={searchGame}
          onChange={handleSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          aria-label="Search">
          <path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"></path>
        </svg>
      </div>
      <div className="filter-bar">
        <span>Filtres :</span>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={selectedTag === tag ? "active" : ""}>
            {tag}
          </button>
        ))}
        {selectedTag && (
          <button onClick={handleResetFilters}>
            Réinitialiser les filtres
          </button>
        )}
      </div>
      <div className="grid-container">
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            isInCart={cartItems.some((item) => item.id === game.id)}
            user={user}
            wishlist={wishlist}
            handleWishlistClick={handleWishlistClick}
          />
        ))}
      </div>
      <Link to="/cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          className="shopping-cart">
          <path d="M14.35 43.95q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.45 0 2.525 1.05t1.075 2.55q0 1.5-1.05 2.55-1.05 1.05-2.55 1.05Zm20 0q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.45 0 2.525 1.05t1.075 2.55q0 1.5-1.05 2.55-1.05 1.05-2.55 1.05Zm-22.6-33 5.5 11.4h14.4l6.25-11.4Zm-1.5-3H39.7q1.6 0 2.025.975.425.975-.275 2.175L34.7 23.25q-.5.85-1.4 1.475-.9.625-1.95.625H16.2l-2.8 5.2h24.55v3h-24.1q-2.1 0-3.025-1.4-.925-1.4.025-3.15l3.2-5.9L6.45 7h-3.9V4H8.4Zm7 14.4h14.4Z"></path>
        </svg>
      </Link>
    </main>
  );
}

export default GameList;
