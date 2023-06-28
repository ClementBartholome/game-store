import React, { useState } from "react";
import GameCard from "../components/GameCard";

const HomePage = ({ games, addToCart, removeFromCart, cartItems }) => {
  const [searchGame, setSearchGame] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

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
          />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
