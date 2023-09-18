import { Link } from "react-router-dom";

export default function GamesColumn({
  columnTitle,
  gamesTitles,
  gamesImages,
  gamesPrices,
}) {
  return (
    <section className="games-column">
      <h2>{columnTitle}</h2>
      <div className="games-column-container">
        <Link to={`/game/${gamesTitles[0].replace(/ /g, "-")}`}>
          <div className="games-column-item">
            <div className="games-column-item-img">
              <img src={gamesImages[0]} alt={gamesTitles[0]} />
            </div>
            <div className="games-column-item-info">
              <h3>{gamesTitles[0]}</h3>
              <p>{gamesPrices[0]}</p>
            </div>
          </div>
        </Link>
        <Link to={`/game/${gamesTitles[1].replace(/ /g, "-")}`}>
          <div className="games-column-item">
            <div className="games-column-item-img">
              <img src={gamesImages[1]} alt={gamesTitles[1]} />
            </div>
            <div className="games-column-item-info">
              <h3>{gamesTitles[1]}</h3>
              <p>{gamesPrices[1]}</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
