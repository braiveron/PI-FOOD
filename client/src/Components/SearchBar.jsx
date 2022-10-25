import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../Actions";
import "./Estilos/SearchBar.css";

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
        />
        <label className="lbl-search">
          <span className="text-search"></span>{" "}
        </label>
      </div>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        BUSCAR
      </button>
    </div>
  );
}
