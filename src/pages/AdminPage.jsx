import React, { useState, useContext, useEffect } from "react";
import { db } from "../FirebaseConfig";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function AdminPage() {
  const { user, isLoading } = useContext(AuthContext);
  const [newGame, setNewGame] = useState({
    title: "",
    description: "",
    fulldescription: "",
    price: 0,
    tags: "",
    specs: {
      link: "",
      release: "",
      developer: "",
      publisher: "",
    },
    cover: "",
    images: "",
  });

  const [redirectToForbidden, setRedirectToForbidden] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        console.log(user);
        console.log(user.email);
        if (user.email === "clementoss@gmail.com") {
          console.log(user.email);
          setRedirectToForbidden(false);
        } else {
          console.log(user.email);
          setRedirectToForbidden(true);
        }
      } else {
        console.log(user);
        setRedirectToForbidden(true);
      }
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (redirectToForbidden) {
    return <Navigate to="/forbidden" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the name of the input is "specs.link", "specs.release", etc. then update the specs object
    if (name.startsWith("specs.")) {
      const specName = name.split("specs.")[1];
      setNewGame((prevState) => ({
        ...prevState,
        specs: {
          ...prevState.specs,
          [specName]: value,
        },
      }));
    } else {
      // Else, update the newGame state with the new value
      setNewGame({
        ...newGame,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the tags and images strings to arrays
    const tagsArray = newGame.tags.split(",").map((tag) => tag.trim());
    const imagesArray = newGame.images.split(",").map((image) => image.trim());

    try {
      const gameToAdd = {
        ...newGame,
        tags: tagsArray,
        images: imagesArray,
      };

      const gameRef = db.collection("games").doc(gameToAdd.title);
      await gameRef.set(gameToAdd);
      console.log(`Jeu ajouté avec le titre : ${gameToAdd.title}`);

      setNewGame({
        title: "",
        description: "",
        fulldescription: "",
        price: 0,
        tags: [],
        specs: {
          link: "",
          release: "",
          developer: "",
          publisher: "",
        },
        cover: "",
        images: [],
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du jeu à Firestore :", error);
    }
  };

  return (
    <div>
      <h1>Page d'administration - Ajouter un nouveau jeu</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={newGame.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={newGame.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description complète</label>
          <textarea
            name="fulldescription"
            value={newGame.fulldescription}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Prix</label>
          <input
            type="number"
            name="price"
            value={newGame.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Tags (séparés par des virgules)</label>
          <input
            type="text"
            name="tags"
            value={newGame.tags}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Lien</label>
          <input
            type="text"
            name="specs.link"
            value={newGame.specs.link}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date de sortie</label>
          <input
            type="text"
            name="specs.release"
            value={newGame.specs.release}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Développeur</label>
          <input
            type="text"
            name="specs.developer"
            value={newGame.specs.developer}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Éditeur</label>
          <input
            type="text"
            name="specs.publisher"
            value={newGame.specs.publisher}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Couverture</label>
          <input
            type="text"
            name="cover"
            value={newGame.cover}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Images</label>
          <input
            type="text"
            name="images"
            value={newGame.images}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Ajouter le jeu</button>
      </form>
    </div>
  );
}
