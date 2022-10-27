import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../Actions";
import "./Estilos/Details.css";
import loader from "../Utilities/loader.gif";

export default function Details() {
  const dispatch = useDispatch();
  const recipeID = useParams();
  useEffect(() => {
    dispatch(getDetails(recipeID.id));
  }, [dispatch]);
  const myRecipe = useSelector((state) => state.details);
  return (
    <div>
      <nav className="nav-container">
        <Link className="button-create" to="/home">
          <p className="button-create">VOLVER</p>
        </Link>
        <p className="page-title">MIS RECETAS</p>
        <Link className="create-title" to="/recipes">
          <p className="button-create"> CREAR RECETA </p>
        </Link>
      </nav>

      <div className="details-container">
        {myRecipe.length > 0 ? (
          <div className="cards-container2">
            <div className="left">
              <div className="resume">
                <h3 className="title-recipe2">{myRecipe[0].title}</h3>
                <img
                  className="img-card detail"
                  src={myRecipe[0].image}
                  alt="img not found"
                  width="250px"
                  height="200px"
                />

                <div className="health-card2">
                  NIVEL SALUDABLE: {myRecipe[0].healthScore}
                </div>
                <div className="diets-card2">
                  <div className="types"> TIPOS DE DIETA: </div>
                  <div className="diets">
                    {myRecipe[0].typeDiets.map((d) => d + ", ")}{" "}
                  </div>
                </div>

                <div className="diets-card2">
                  <div className="types"> TIPO DE PLATO: </div>
                  <div className="diets">
                    {myRecipe[0].dishTypes.join(", ")}
                  </div>
                </div>
              </div>
            </div>

            <div className="right">
              <div className="resume">
                <div className="resume-title"> Resumen </div>
                <div className="parrafo">
                  {myRecipe[0].summary.replace(/<[^>]*>?/g, "")}
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-title"> Paso a paso</div>
              <div className="parrafo">
                {myRecipe[0].analyzedInstructions[0] ? (
                  myRecipe[0].analyzedInstructions[0].steps.map((s) => {
                    return (
                      <li key={s.number}>
                        {" "}
                        {s.number} - {s.step}
                        <br />
                        <br />
                      </li>
                    );
                  })
                ) : (
                  <div>No existe el paso a paso</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="loading">
            <img
              src={loader}
              alt="img not found"
              width="250px"
              height="250px"
            />
            <h1 className="load-title">LOADING...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
