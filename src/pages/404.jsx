import React from "react";
import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="page-404">
      <span>404</span>
      <p>Oups! La page que vous demandez n'existe pas.</p>
      <NavLink to="/">Retourner sur la page d'accueil</NavLink>
    </div>
  );
}

export default PageNotFound;
