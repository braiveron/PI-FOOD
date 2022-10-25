import React from "react";
import { Link } from "react-router-dom";
import "./Estilos/Card.css";

export default function RecipeCard({
  title,
  image,
  typeDiets,
  healthScore,
  id,
}) {
  return (
    <div className="card">
      <h3 className="title-recipe">{title}</h3>

      <div className="img-container">
        <figure>
          <Link to={"/recipes/" + id}>
            <img
              className="img-card"
              src={image}
              alt="img not found"
              width="250px"
              height="200px"
            />
          </Link>
          <div className="capa">
            <h5 className="img-text">Clic para</h5> <br />
            <h5 className="img-text2">mas INFO</h5>
          </div>
        </figure>
      </div>

      <div className="diets-card">
        {" "}
        TIPOS DE DIETA: <br />
        <div className="diets">{typeDiets.join(", ")} </div>
      </div>
      <div className="health-card">NIVEL SALUDABLE:{" " + healthScore}</div>
    </div>
  );
}
