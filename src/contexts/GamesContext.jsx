import { createContext, useEffect, useState } from "react";
import { db } from "../FirebaseConfig";

const GamesContext = createContext();

export default GamesContext;

export function GamesProvider({ children }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesSnapshot = await db.collection("games").get();
        const gamesData = gamesSnapshot.docs.map((doc) => doc.data());
        gamesData.sort((a, b) => b.id - a.id);
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games from Firestore:", error);
      }
    };

    fetchGames();
  }, []);

  const gamesContextValue = {
    games,
  };

  return (
    <GamesContext.Provider value={gamesContextValue}>
      {children}
    </GamesContext.Provider>
  );
}
