// import { db } from "./FirebaseConfig";
// import games from "./data";

// const addGamesToFirestore = async () => {
//   try {
//     console.log(games);
//     for (const game of games) {
//       const gameRef = db.collection("games").doc(String(game.title));

//       const snapshot = await gameRef.get();
//       if (snapshot.exists) {
//         console.log(
//           `Game with title ${game.title} already exists, skipping...`
//         );
//         continue;
//       }

//       await gameRef.set(game);
//       console.log(`Added game with title: ${game.title}`);
//     }
//     console.log("All games added to Firestore");
//   } catch (error) {
//     console.error("Error adding games to Firestore:", error);
//   }
// };

// addGamesToFirestore();
