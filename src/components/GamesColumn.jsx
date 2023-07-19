import React from "react";

export default function GamesColumn({ columnTitle }) {
  return (
    <section className="games-column">
      <h2>{columnTitle}</h2>
      <div className="games-column-container">
        <div className="games-column-item">
          <div className="games-column-item-img">
            <img
              src="https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360"
              alt="Cyberpunk 2077"
            />
          </div>
          <div className="games-column-item-info">
            <h3>Cyberpunk 2077</h3>
            <p>59,99€</p>
          </div>
        </div>
        <div className="games-column-item">
          <div className="games-column-item-img">
            <img
              src="https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360"
              alt="Cyberpunk 2077"
            />
          </div>
          <div className="games-column-item-info">
            <h3>Cyberpunk 2077</h3>
            <p>59,99€</p>
          </div>
        </div>
      </div>
    </section>
  );
}
