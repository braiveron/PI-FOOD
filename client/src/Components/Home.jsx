import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  getRecipes,
  filterByType,
  filterByScore,
  filterCreated,
} from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const [orderScore, setOrderScore] = useState("");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleReload(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
  }

  function handleFilterScore(e) {
    e.preventDefault();
    dispatch(filterByScore(e.target.value));
    setCurrentPage(1);
    setOrderScore("Order" + e.target.value);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div>
      <Link to="/recipes">CREAR RECETA</Link>
      <h1>MIS RECETAS</h1>
      <button
        onClick={(e) => {
          handleReload(e);
        }}
      >
        VOLVER A CARGAR RECETAS
      </button>

      <div>
        <select>
          <option value="all">ORDEN ALFABETICO</option>
          <option value="asc">A - Z</option>
          <option value="des">Z - A</option>
        </select>

        <select onChange={(e) => handleFilterType(e)}>
          <option value="all">Tipos de Dieta</option>
          {allDiets?.map((d) => {
            return (
              <option value={d.name} key={d.name}>
                {d.name}
              </option>
            );
          })}
        </select>

        <select onChange={(e) => handleFilterScore(e)}>
          <option value="all">Nivel Saludable</option>
          <option value="asc">BAJO - ALTO</option>
          <option value="desc">ALTO - BAJO</option>
        </select>

        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">Existente o Creada</option>
          <option value="db">Creada</option>
          <option value="api">Existente</option>
        </select>

        <Paginado
          receipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />

        {currentRecipes?.map((r) => {
          return (
            <Card
              title={r.title}
              image={r.image}
              typeDiets={r.typeDiets}
              healthScore={r.healthScore}
              key={r.id}
            />
          );
        })}
      </div>
    </div>
  );
}
