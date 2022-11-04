import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  getRecipes,
  filterByType,
  filterByScore,
  orderByName,
} from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import loader from "../Utilities/loader.gif";
import "./Estilos/Home.css";

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
  const [orderName, setOrderName] = useState("");

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
    setCurrentPage(1);
    setOrderScore("Ordenado" + e.target.value);
  }

  function handleFilterScore(e) {
    e.preventDefault();
    dispatch(filterByScore(e.target.value));
    setCurrentPage(1);
    setOrderScore("Ordenado" + e.target.value);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName("Ordenado" + e.target.value);
  }

  return (
    <div className="home-container">
      <div className="home">
        <nav className="nav-container">
          <Link className="create-title" to="/recipes">
            <p className="button-create"> CREAR RECETA </p>
          </Link>
          <p className="page-title">MIS RECETAS</p>
          <SearchBar setCurrentPage={setCurrentPage} />
        </nav>

        <div className="filters-container">
          <select className="filter-box" onChange={(e) => handleSort(e)}>
            <option className="option" value="all">
              ORDEN ALFABETICO
            </option>
            <option className="option" value="asc">
              A - Z
            </option>
            <option className="option" value="des">
              Z - A
            </option>
          </select>

          <select className="filter-box" onChange={(e) => handleFilterType(e)}>
            <option value="all">Tipos de Dieta</option>
            {allDiets?.map((d) => {
              return (
                <option value={d.name} key={d.name}>
                  {d.name}
                </option>
              );
            })}
          </select>

          <select className="filter-box" onChange={(e) => handleFilterScore(e)}>
            <option value="all">Nivel Saludable</option>
            <option value="asc">BAJO - ALTO</option>
            <option value="desc">ALTO - BAJO</option>
          </select>
          <button
            className="filter-box"
            onClick={(e) => {
              handleReload(e);
            }}
          >
            CARGAR RECETAS
          </button>
        </div>
        <Paginado
          receipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="cards-container">
          {currentRecipes.length > 0 ? (
            currentRecipes?.map((r) => {
              return (
                <Card
                  id={r.id}
                  title={r.title}
                  image={r.image}
                  typeDiets={r.types ? r.types.map((t) => t.name) : r.typeDiets}
                  healthScore={r.healthScore}
                  key={r.id}
                />
              );
            })
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
    </div>
  );
}
