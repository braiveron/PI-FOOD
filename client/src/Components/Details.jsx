import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../Actions";

export default function Details() {
  const dispatch = useDispatch();
  const recipeID = useParams();
  useEffect(() => {
    dispatch(getDetails(recipeID.id));
  }, [dispatch]);
  const myRecipe = useSelector((state) => state.details);
  return (
    <div>
      {myRecipe.length > 0 ? (
        <div>
          <h1>Titulo: {myRecipe[0].title}</h1>
          <img
            src={myRecipe[0].image}
            alt="image not found"
            width="250px"
            height="200px"
          />
          <h2>Nivel Saludable: {myRecipe[0].healthScore}</h2>
          <h2>Tipos de Dieta: {myRecipe[0].typeDiets.map((d) => d + ", ")} </h2>
          <h2>Tipo de plato: {myRecipe[0].dishTypes} </h2>
          <h4>Resumen: {myRecipe[0].summary.replace(/<[^>]*>?/g, "")} </h4>
          <p>
            Paso a paso:{" "}
            {myRecipe[0].analyzedInstructions[0].steps.map((s) => (
              <li key={s.number}>
                {" "}
                {s.number} - {s.step}
                <br />
                <br />
              </li>
            ))}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>VOLVER</button>
      </Link>
    </div>
  );
}
