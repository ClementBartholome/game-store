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
    <main className="admin-page">
      <h1>Page d'administration</h1>
      <h2>Ajouter un nouveau jeu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={newGame.title}
            onChange={handleInputChange}
            placeholder="Titre du jeu"
          />
        </div>
        <div>
          <textarea
            name="description"
            value={newGame.description}
            onChange={handleInputChange}
            placeholder="Description courte"
          />
        </div>
        <div>
          <textarea
            name="fulldescription"
            value={newGame.fulldescription}
            onChange={handleInputChange}
            placeholder="Description complète"
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            value={newGame.price}
            onChange={handleInputChange}
            placeholder="Prix en euros"
          />
        </div>
        <div>
          <input
            type="text"
            name="tags"
            value={newGame.tags}
            onChange={handleInputChange}
            placeholder="Tags (séparés par des virgules)"
          />
        </div>
        <div>
          <input
            type="text"
            name="specs.link"
            value={newGame.specs.link}
            onChange={handleInputChange}
            placeholder="Lien vers le site officiel"
          />
        </div>
        <div>
          <input
            type="text"
            name="specs.release"
            value={newGame.specs.release}
            onChange={handleInputChange}
            placeholder="Date de sortie"
          />
        </div>
        <div>
          <input
            type="text"
            name="specs.developer"
            value={newGame.specs.developer}
            onChange={handleInputChange}
            placeholder="Développeur"
          />
        </div>
        <div>
          <input
            type="text"
            name="specs.publisher"
            value={newGame.specs.publisher}
            onChange={handleInputChange}
            placeholder="Éditeur"
          />
        </div>

        <div>
          <input
            type="text"
            name="cover"
            value={newGame.cover}
            onChange={handleInputChange}
            placeholder="URL de l'image de couverture"
          />
        </div>
        <div>
          <input
            type="text"
            name="images"
            value={newGame.images}
            onChange={handleInputChange}
            placeholder="URL des images (séparées par des virgules)"
          />
        </div>
        <button type="submit">Ajouter le jeu</button>
      </form>
    </main>
  );
}
