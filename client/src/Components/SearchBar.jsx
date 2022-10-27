import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../Actions";
import "./Estilos/SearchBar.css";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameRecipes(title));
    setTitle("");
    setCurrentPage(1);
  };

  return (
    <div className="searchBar">
      <div className="form-search">
        <input
          type="text"
          onChange={(e) => handleInputChange(e)}
          value={title}
          placeholder="Buscar receta"
          className="input-search"
        />

        <div className="btn-icon">
          <i className="search-icon" onClick={(e) => handleSubmit(e)}>
            <AiOutlineSearch className="tarea-icono" />
          </i>
        </div>
      </div>
    </div>
  );
}
